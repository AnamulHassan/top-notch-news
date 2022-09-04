// ----------Main Function----------
const displayCategory = async () => {
  try {
    freeSpace.classList.remove('d-none');
    footerYearUpdate();
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const apiData = await fetchData(url);
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
  } catch (error) {
    displayError(error);
  }
};

displayCategory();
const displayNews = async (categoryId, categoryName) => {
  try {
    loadingSpinner.classList.remove('d-none');
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const apiData = await fetchData(url);
    const receivingData = apiData.data;
    const sortingResult = sortingArray(receivingData);
    displayAlert(sortingResult, categoryName);
    renderMarkupNews(sortingResult);
  } catch (error) {
    displayError(error);
  }
};

const displayDetails = async newsId => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    const apiData = await fetchData(url);
    const receivingData = apiData.data[0];
    const { author, details, image_url, rating, title, total_view } =
      receivingData;
    const { img, name, published_date } = author;
    const date = new Date(published_date);
    detailsContainer.innerHTML = `
    <div class="modal-header">
                <h5 class="modal-title fs-3 fw-semibold">${
                  title ? title : 'title not found'
                }</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="card border border-0">
                  <img class="w-100 h-100" src="${
                    image_url ? image_url : 'icons/no-image.jpg'
                  }" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <p class="card-text">
                     ${details ? details : 'details not found'}
                    </p>
                  </div>
                </div>
                <div
                class=" my-3 container d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row flex-xxl-row  justify-content-center align-items-center col-12"
              >
                <div class="d-flex flex-column flex-sm-column flex-md-column flex-lg-row flex-xl-row flex-xxl-row  align-items-center col-10 col-sm-10 col-md-3 col-lg-4 col-xl-4 col-xxl-4">
                  <img
                    class="w-25 rounded-circle border border-secondary border-2 me-2"
                    src="${img ? img : 'icons/user.png'}"
                    alt="${name ? name : 'name not found'}"
                  />
                  <ul class="list-unstyled  text-center text-sm-center text-md-center text-lg-start text-xl-start text-xxl-start col-6 col-sm-6 col-md-4 col-lg-12 col-xl-12 col-xxl-12">
                    <li class="fs-5 fw-bold text-secondary">
                      ${name ? name : 'name not found'}
                    </li>
                    <li class="fs-6 fw-semibold text-secondary">
                      ${
                        date
                          ? date.toString().split(' ')[1] +
                            ' ' +
                            date.getDate() +
                            ', ' +
                            date.getFullYear()
                          : 'date not found'
                      }
                    </li>
                  </ul>
                </div>
                <ul
                  class="list-unstyled d-flex align-items-center justify-content-center pe-4 col-10 col-sm-10 col-md-3 col-lg-2 col-xl-2 col-xxl-2"
                >
                  <li>
                    <i class="me-3 fs-3 fw-bold text-secondary bi bi-eye"></i>
                  </li>
                  <li class="fs-4 fw-bold text-secondary">
                    ${total_view ? total_view : 'data not found'}
                  </li>
                </ul>
                <ul
                  class="list-unstyled d-flex align-items-center justify-content-center pe-4 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 text-center text-sm-center text-md-center text-lg-start text-xl-start text-xxl-start "
                >
                  <li class="fs-4 me-2 fw-bold text-secondary">
                    Rating: 
                  </li>
                  <li class="fs-4 fw-bold text-secondary">
                    ${rating.number ? rating.number : 'data not found'}
                  </li>
                </ul>
                <ul
                  class="list-unstyled d-flex align-items-center fs-4 text-warning justify-content-between col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-xxl-2"
                >
                  <li><i class="bi bi-star-fill"></i></li>
                  <li><i class="bi bi-star-fill"></i></li>
                  <li><i class="bi bi-star-fill"></i></li>
                  <li><i class="bi bi-star-fill"></i></li>
                  <li><i class="bi bi-star-half"></i></li>
                </ul>
              </div>
              </div>
             
    `;
    loadingSpinner.classList.add('d-none');
  } catch (error) {
    displayError(error);
  }
};

// ------------Event Handler------------
btnTrending.addEventListener('click', function () {
  loadingSpinner.classList.remove('d-none');
  const url = `https://openapi.programming-hero.com/api/news/category/08`;
  displayTrending(url);
});
btnTodaysPick.addEventListener('click', function () {
  loadingSpinner.classList.remove('d-none');
  const url = `https://openapi.programming-hero.com/api/news/category/08`;
  displayTodaysPick(url);
});

tabBar.addEventListener('click', function (event) {
  for (const li of event.target.parentNode.children) {
    li.classList.remove('active');
  }
  event.target.classList.toggle('active');
});
btnHome.addEventListener('click', function () {
  newsContainer.textContent = '';
  alertField.innerText = 'Please, select categories :-)';
  freeSpace.classList.remove('d-none');
});
// -------------Feature Function-------------
const displayTrending = url => {
  processFetchData(url, true, 'is_trending', 'Trending');
};

const displayTodaysPick = url => {
  processFetchData(url, true, 'is_todays_pick', "Today's Pick");
};
