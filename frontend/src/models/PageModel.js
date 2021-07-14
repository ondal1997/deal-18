import Observable from "../utils/Observer";

export default class PageModel extends Observable {
    constructor() {
        super();
        this.page = 'Home';
        this.targetPage = null;
        this.isProcessing = false;
        this.direction = 'left';
    }

    getPage() {
        return this.page;
    }

    switchPage(targetPage, direction = "left") {
        this.targetPage = targetPage;
        this.isProcessing = true;
        this.direction = direction;
        this.notify();

        setTimeout(() => {
            this.page = targetPage;
            this.targetPage = null;
            this.isProcessing = false;
            this.notify();
        }, 1000);
    }
}

/*
{
    'home': Home,
    '
}
*/