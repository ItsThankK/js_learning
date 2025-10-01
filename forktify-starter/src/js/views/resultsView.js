import View from './Views';
import icons from 'url:../../img/icons.svg'; //Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector(`.results`);

  _generateMarkup() {
    return this._data.map(data => this._generateMarkupPreview(data)).join(``);
  }

  _generateMarkupPreview(data) {
          return `
          <li class="preview">
            <a class="preview__link" href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultsView();
