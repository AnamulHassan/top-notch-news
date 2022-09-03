const fetchData = async url => {
  const response = await fetch(url);
  const receivingData = await response.json();
  return receivingData;
};

const displayCategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const apiData = await fetchData(url);
  // console.log(apiData);
  categoryList.forEach((element, index) => {
    const { category_id, category_name } = apiData.data.news_category[index];
    element.addEventListener('mouseover', function (event) {
      event.target.classList.toggle('active');
      event.target.setAttribute(
        'onclick',
        `displayNews("${category_id}","${category_name}")`
      );
      event.target.classList.toggle('active');
    });
    element.innerText = category_name;
  });
};

displayCategory();
const displayNews = async (categoryId, categoryName) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  const apiData = await fetchData(url);
  const receivingData = apiData.data;
  const sortReceivingData = receivingData
    .sort((a, b) => a.total_view - b.total_view)
    .reverse();
  console.log(sortReceivingData);
  sortReceivingData.length > 0
    ? (alertField.innerText = `${sortReceivingData.length} items found for category ${categoryName}`)
    : (alertField.innerText = `${categoryName} News not found`);

  newsContainer.textContent = '';
  sortReceivingData.forEach((element, index) => {
    const {
      _id,
      author,
      category_id,
      details,
      image_url,
      others_info,
      rating,
      thumbnail_url,
      title,
      total_view,
    } = element;
    const { img, name, published_date } = author;
    const date = new Date(published_date);
    // console.log(category_id);

    const newArticle = document.createElement('article');
    newArticle.classList.add('card', 'mb-3');
    newArticle.innerHTML = `
    <div class="row g-0">
      <div class="col-md-4 d-flex justify-content-center">
        <img
          src="${image_url ? image_url : 'icons/no-image.jpg'}"
          class="img-fluid rounded-4 p-2"
          alt="..."
        />
      </div>
      <div
        class="col-md-8 px-0 px-sm-0 px-md-1 px-lg-4 px-xl-4 px-xxl-4 py-5 m-0"
      >
        <div class="card-body">
          <h5 class="card-title fs-3">
            ${title ? title : 'Title not found'}
          </h5>
          <p class="card-text fs-base">
           ${
             details.length >= 106
               ? details.slice(0, 195) + '...'
               : 'Details not found'
           }
          </p>
          <section
            class="d-flex flex-column flex-sm-column flex-md-column flex-lg-row flex-xl-row flex-xxl-row justify-content-between col-12"
          >
            <div
              class="d-flex align-items-center col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6"
            >
              <div class="d-flex align-items-center">
                <img
                  class="w-25 rounded-circle border border-secondary border-2 me-2"
                  src="${img ? img : 'icons/user.png'}"
                  alt="${name ? name : 'Name not found'}"
                />
                <ul class="list-unstyled col-12">
                  <li class="fs-5 fw-bold text-secondary">${
                    name ? name : 'Name not found'
                  }</li>
                  <li class="fs-6 fw-semibold text-secondary">${
                    date
                      ? date.toString().split(' ')[1] +
                        ' ' +
                        date.getDate() +
                        ', ' +
                        date.getFullYear()
                      : 'Date not found'
                  }
                  </li>
                </ul>
              </div>
              <ul
                class="list-unstyled d-flex align-items-center justify-content-end pe-4 col-6"
              >
                <li>
                  <i class="me-1 fs-3 fw-bold text-secondary bi bi-eye"></i>
                </li>
                <li class="fs-4 fw-bold text-secondary">${
                  total_view ? total_view : '0'
                }</li>
              </ul>
            </div>
            <div
              class="d-flex align-items-center justify-content-between col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6"
            >
              <ul
                class="list-unstyled d-flex align-items-center fs-4 text-secondary justify-content-between col-4 col-sm-4 col-md-4 col-lg-6 col-xl-6 col-xxl-6"
              >
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star"></i></li>
              </ul>
              <!-- Button trigger modal -->
              <span
                class="link"
                role="button"
                tabindex="0"
                data-bs-toggle="modal"
                data-bs-target="#btn-show-details"
                ><i
                  class="text-info col-6 d-block fs-1 bi bi-info-circle"
                ></i
              ></span>
            </div>
          </section>
        </div>
      </div>
    </div>
    `;
    newsContainer.appendChild(newArticle);
  });
};
