const gallery = [
  { title: "Koloryzacja", category: "Kolor", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=85" },
  { title: "Nowa fryzura", category: "Strzyżenie", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=85" },
  { title: "Pielęgnacja", category: "Pielęgnacja", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85" },
  { title: "Naturalny efekt", category: "Stylizacja", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=85" },
  { title: "Metamorfoza", category: "Kolor", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85" },
  { title: "Studio Nanka", category: "Salon", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85" },
];

export default function GalleryPage() {
  return (
    <main className="galleryPage">
      <div className="wrap galleryIntro">
        <a className="backLink" href="/">← Nanka Hair Studio</a>
        <div className="eyebrow">Galeria</div>
        <h1>Efekty, które mówią same za siebie.</h1>
        <p>Inspiracje i realizacje Nanka Hair Studio. Zobacz klimat salonu i przykładowe efekty.</p>
      </div>
      <div className="wrap galleryGrid">
        {gallery.map((item, index) => (
          <article className={index % 3 === 0 ? "galleryItem galleryItemTall" : "galleryItem"} key={item.title}>
            <div className="galleryImage" style={{ backgroundImage: `url(${item.image})` }} />
            <div className="galleryCaption">
              <span>{item.category}</span>
              <strong>{item.title}</strong>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
