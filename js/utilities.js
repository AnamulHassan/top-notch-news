// -----------Fetching Data Function-----------
const fetchData = async url => {
  try {
    const response = await fetch(url);
    // console.log(response);
    const receivingData = await response.json();
    return receivingData;
  } catch (error) {
    displayError(error);
  }
};
// ------------Display Alert Function------------
const displayAlert = (receivingData, categoryName) => {
  if (receivingData.length > 0) {
    alertField.innerText = `${receivingData.length} items found for category ${categoryName}`;
  } else {
    loadingSpinner.classList.add('d-none');
    alertField.innerText = 'News not found';
  }
};

// ----------Render Markup On HTML File Function----------
const renderMarkupNews = receivingData => {
  freeSpace.classList.add('d-none');
  newsContainer.textContent = '';
  receivingData.forEach(element => {
    const { _id, author, details, image_url, title, total_view } = element;
    const { img, name, published_date } = author;
    const date = new Date(published_date);
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
                class="list-unstyled d-flex align-items-center fs-4 text-warning justify-content-between col-4 col-sm-4 col-md-4 col-lg-6 col-xl-6 col-xxl-6"
              >
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-half"></i></li>
              </ul>
              <!-- Button trigger modal -->
              <span
                class="link"
                ><i
                  class="text-info col-6 d-block fs-1 bi bi-info-circle"  role="button"
                  data-bs-toggle="modal" data-bs-target="#btn-show-details"  onclick="displayDetails('${_id}')"
                ></i
              ></span>
            </div>
          </section>
        </div>
      </div>
    </div>
    `;
    newsContainer.appendChild(newArticle);
    loadingSpinner.classList.add('d-none');
  });
};

// ---------Sorting Reverse Function---------
const sortingArray = receivingData =>
  receivingData.sort((a, b) => a.total_view - b.total_view).reverse();
// --------Display Error On Screen Function--------
const displayError = error => {
  loadingSpinner.classList.add('d-none');
  displayErrorMessage.classList.remove('d-none');
  errorText.innerText = error;
};
//  ------------Process Fetch Data------------
const processFetchData = async (url, isTrue, key, categoryName) => {
  try {
    const apiData = await fetchData(url);
    const receivingData = apiData.data;
    const trendingNews = receivingData.filter(
      el => el.others_info[key] === isTrue
    );
    const sortingResult = sortingArray(trendingNews);
    renderMarkupNews(sortingResult);
    displayAlert(sortingResult, categoryName);
  } catch (error) {
    displayError(error);
  }
};
