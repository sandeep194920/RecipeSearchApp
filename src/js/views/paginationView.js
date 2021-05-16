import View from './View'
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {

    _parentElement = document.querySelector('.pagination')
    _generateMarkup() {

        const currentPage = this._data.page
        // CASES NEED TO BE TAKEN CARE OF
        // Page 1 and there are other pages
        // Page 1 and there are No other pages
        // Last Page
        // Other pages


        // how many pages there are:
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
        console.log(numPages)

        const pageForward =
            `
        <button class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
        const pageBackward =
            `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        `

        // Page 1 and there are other pages
        if (currentPage === 1 && numPages > 1) {
            console.log("Page 1 and other pages")
            return pageForward
        }

        // Page 1 and there are No other pages
        // Last page
        if (currentPage === numPages && numPages > 1) {
            console.log("Last page")
            return pageBackward

        }
        // Other pages
        if (currentPage < numPages) {

            console.log("We have Other pages")
            return [pageForward, pageBackward].join('')
        }

        console.log("1 page")
        return ''
    }


}

export default new PaginationView()