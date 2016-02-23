
;(function () {

    let app;


    // fetch all dependencies
    fetch.get(['/content/projects.json', '/content/content.json']).then((config) => {

        console.log(config);
    });

} ());
