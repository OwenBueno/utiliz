import {
  checkFileSize,
  downloadBlob,
  formatFileSize,
  revokeObjectUrl,
} from '../../lib/file-utils.ts';

export function initImageConverter(): void {
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
  const previewArea = document.getElementById('previewArea');
  const previewImg = document.getElementById('previewImg') as HTMLImageElement | null;
  const imgName = document.getElementById('imgName');
  const imgSize = document.getElementById('imgSize');
  const fmtSelect = document.getElementById('fmtSelect') as HTMLSelectElement | null;
  const qualSlider = document.getElementById('qualSlider') as HTMLInputElement | null;
  const qualVal = document.getElementById('qualVal');
  const convertBtn = document.getElementById('convertBtn') as HTMLButtonElement | null;
  const warningEl = document.getElementById('file-size-warning');

  if (!dropZone || !fileInput || !previewArea || !previewImg || !convertBtn) return;

  let imgBlob: File | null = null;
  let previewUrl: string | null = null;
  let blocked = false;

  const showWarning = (message: string, isBlock: boolean) => {
    if (!warningEl) return;
    warningEl.textContent = message;
    warningEl.classList.toggle('visible', Boolean(message));
    warningEl.classList.toggle('file-size-warning--block', isBlock);
  };

  const resetPreview = () => {
    revokeObjectUrl(previewUrl);
    previewUrl = null;
    previewImg.src = '';
    previewArea.classList.remove('visible');
    dropZone.style.display = '';
    imgBlob = null;
    blocked = false;
    convertBtn.disabled = false;
    showWarning('', false);
  };

  const loadImage = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const sizeCheck = checkFileSize(file);
    showWarning(sizeCheck.message, sizeCheck.block);
    blocked = sizeCheck.block;
    convertBtn.disabled = sizeCheck.block;

    revokeObjectUrl(previewUrl);
    imgBlob = file;
    previewUrl = URL.createObjectURL(file);
    previewImg.src = previewUrl;

    if (imgName) imgName.textContent = file.name;
    if (imgSize) imgSize.textContent = formatFileSize(file.size);

    dropZone.style.display = 'none';
    previewArea.classList.add('visible');
  };

  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drop-zone--active');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drop-zone--active');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drop-zone--active');
    const file = e.dataTransfer?.files[0];
    if (file) loadImage(file);
  });

  fileInput.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) loadImage(file);
  });

  qualSlider?.addEventListener('input', () => {
    if (qualVal && qualSlider) qualVal.textContent = `${qualSlider.value}%`;
  });

  convertBtn.addEventListener('click', () => {
    if (!imgBlob || blocked) return;

    const fmt = fmtSelect?.value ?? 'webp';
    const quality = parseInt(qualSlider?.value ?? '85', 10) / 100;
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d')?.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) downloadBlob(blob, `converted.${fmt}`);
        },
        `image/${fmt}`,
        quality,
      );
      revokeObjectUrl(img.src);
    };

    img.src = URL.createObjectURL(imgBlob);
  });

  resetPreview();
}
