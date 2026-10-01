'use client';

import { useEffect, useState } from "react";

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  visible: boolean;
};

const starter: GalleryItem[] = [
  { id: 1, title: "Koloryzacja", category: "Kolor", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80", visible: true },
  { id: 2, title: "Nowa fryzura", category: "Strzyżenie", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80", visible: true },
  { id: 3, title: "Pielęgnacja", category: "Pielęgnacja", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80", visible: true },
];

export default function AdminPage() {
  const [items, setItems] = useState<GalleryItem[]>(starter);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Kolor");
  const [image, setImage] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("nanka-gallery");
    if (raw) setItems(JSON.parse(raw));
  }, []);

  const persist = (next: GalleryItem[]) => {
    setItems(next);
    localStorage.setItem("nanka-gallery", JSON.stringify(next));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const add = () => {
    if (!title.trim() || !image.trim()) return;
    persist([...items, { id: Date.now(), title: title.trim(), category, image: image.trim(), visible: true }]);
    setTitle("");
    setImage("");
  };

  const remove = (id: number) => persist(items.filter(item => item.id !== id));
  const toggle = (id: number) => persist(items.map(item => item.id === id ? { ...item, visible: !item.visible } : item));

  return (
    <main className="adminShell">
      <aside className="adminSide">
        <a className="adminBrand" href="/">Nanka <small>Hair Studio</small></a>
        <div className="adminLabel">Panel właściciela</div>
        <nav className="adminNav">
          <a className="active" href="/admin">Galeria</a>
          <a href="/admin">Usługi i ceny</a>
          <a href="/admin">Opinie</a>
          <a href="/admin">Ustawienia</a>
        </nav>
        <a className="adminBack" href="/">← Zobacz stronę</a>
      </aside>

      <section className="adminMain">
        <div className="adminTop">
          <div>
            <div className="eyebrow">Panel właściciela</div>
            <h1>Zarządzaj galerią</h1>
            <p>Dodawaj realizacje, ukrywaj zdjęcia i przygotuj galerię dla klientek.</p>
          </div>
          {saved && <span className="saveBadge">✓ Zapisano</span>}
        </div>

        <div className="adminStats">
          <div><strong>{items.length}</strong><span>zdjęć</span></div>
          <div><strong>{items.filter(i => i.visible).length}</strong><span>widocznych</span></div>
          <div><strong>24/7</strong><span>panel online</span></div>
        </div>

        <div className="adminCard">
          <div className="adminCardHead"><div><h2>Dodaj zdjęcie</h2><p>Na razie zdjęcia są dodawane przez adres URL. W kolejnym kroku podłączymy prawdziwy upload do chmury.</p></div></div>
          <div className="adminForm">
            <label>Nazwa<input value={title} onChange={e => setTitle(e.target.value)} placeholder="np. Metamorfoza" /></label>
            <label>Kategoria<select value={category} onChange={e => setCategory(e.target.value)}><option>Kolor</option><option>Strzyżenie</option><option>Pielęgnacja</option><option>Stylizacja</option><option>Salon</option></select></label>
            <label className="wide">Adres zdjęcia<input value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." /></label>
            <button className="adminButton" onClick={add}>+ Dodaj do galerii</button>
          </div>
        </div>

        <div className="adminCard">
          <div className="adminCardHead"><div><h2>Twoje zdjęcia</h2><p>Widoczność możesz zmienić jednym kliknięciem.</p></div></div>
          <div className="adminGallery">
            {items.map(item => (
              <article className="adminPhoto" key={item.id}>
                <div className="adminPhotoImage" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="adminPhotoBody"><div><strong>{item.title}</strong><span>{item.category}</span></div><span className={item.visible ? "status on" : "status"}>{item.visible ? "Widoczne" : "Ukryte"}</span></div>
                <div className="adminPhotoActions"><button onClick={() => toggle(item.id)}>{item.visible ? "Ukryj" : "Pokaż"}</button><button className="danger" onClick={() => remove(item.id)}>Usuń</button></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
