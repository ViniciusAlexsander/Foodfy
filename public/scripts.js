const cards = document.querySelectorAll(".card");

for (let card of cards) {
  card.addEventListener("click", function () {
    const receitaId = card.getAttribute("id");
    window.location.href = `/receita/${receitaId}`;
  });
}

const PhotosUpload = {
  preview: document.querySelector("#photos-preview"),
  uploadLimit: 5,
  handleFileInput(event) {
    const { files: fileList } = event.target;

    if (!PhotosUpload.hasLimit(event)) return;

    Array.from(fileList).forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const div = PhotosUpload.getContainer(image);
        PhotosUpload.preview.appendChild(div);
      };

      reader.readAsDataURL(file);
    });
  },
  hasLimit(event) {
    const { uploadLimit } = PhotosUpload;
    const { files: fileList } = event.target;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`);
      event.preventDefault();
      return false;
    }

    return true;
  },
  getContainer(image) {
    const div = document.createElement("div");
    div.classLista.add("photo");

    div.onclick = PhotosUpload.removePhoto;

    div.appendChild(image);

    div.appendChild(PhotosUpload.getRemoveButton());

    return div;
  },
  getRemoveButton() {
    const button = document.createElement("i");
    button.classList.add("material-icons");
    button.innerHTML = "close";
    return button;
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    photoDiv.remove()
  }
};
