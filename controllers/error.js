exports.getPageError = (req, res, next) => {
    // console.log(req.url);
    res.status(404).render('errors/404',{
        pageTitle: "Page Not Found",
        path: req.url,
        // activeShop: false,
        // activeAddProduct: false,
        // productCSS: false,
        // formCSS: false,
        isAuthenticated: req.isAuthenticated
    });
};

exports.get500 = (req, res, next) => {
    // console.log(req.url);
    res.status(500).render('500',{
        pageTitle: "Error!",
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
};