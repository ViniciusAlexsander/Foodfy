const cards = document.querySelectorAll(".card");

for (let card of cards) {
  card.addEventListener("click", function () {
    const receitaId = card.getAttribute("id");
    window.location.href = `/receita/${receitaId}`;
  });
}

const PhotosUpload = {
  uploadLimit: 5,
  handleFileInput(event) {
    const { files: fileList } = event.target;
    const { uploadLimit } = PhotosUpload;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`);
      event.preventDefault();
      return;
    }

    Array.from(fileList).forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const div = document.createElement("div");
        div.classLista.add("photo");

        div.onclick = () => alert("cliquei");

        div.appendChild(image);

        document.querySelector("#photos-preview").appendChild(div);
      };

      reader.readAsDataURL(file);
    });
  },
};
