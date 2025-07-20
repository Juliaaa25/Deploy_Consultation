// 1. Отправить запрос на https://api.sampleapis.com/wines/whites
//  и получить (вывести в консоль) массив с данными о белых винах
// 2. Отрисовать карточки вин с рейтингом 4.8 и более (image, wine, winery, rating)
// 3. Стилизовать карточки (border, padding, border-radius).
//  Из контейнера сделать grid - 5 колонок + отступы
//  display: grid;
//  grid-template-columns: repeat(5, 1fr);
//  gap: 40px;
// 4. Если у вина рейтинг 4.9 и больше то покрасить карточку
//  в светло-зеленый. А если 4.8 - то в светло-голубой

const container = document.querySelector(".container");

async function fetchWines() {
  try {
    const res = await fetch("https://api.sampleapis.com/wines/whites");
    const wines = await res.json();
    console.log(wines);

    const topWines = wines.filter((wine) => wine.rating?.average >= 4.8);

    topWines.forEach((wine) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const rating = wine.rating?.average || "N/A";

      if (rating >= 4.9) {
        card.style.backgroundColor = "#00D9B1";
      } else {
        card.style.backgroundColor = "#0C5CC9";
      }

      card.innerHTML = `
    <img src="${wine.image}" alt="${wine.wine}" />
    <h3>${wine.wine}</h3>
    <p><strong>Winery:</strong> ${wine.winery}</p>
    <p><strong>Rating:</strong> ${rating}</p>
  `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Ошибка загрузки вин:", err);
  }
}

fetchWines();
