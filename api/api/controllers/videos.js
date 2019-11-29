const db = require('../db')

const getVideos = function (req, res) {
    const search = req.query.search;
    const searchField = search && search.length > 0 ? `WHERE LOWER(caption.text) LIKE LOWER($1)` : '';
    const params = searchField === '' ? [] : ['%' + search + '%'];

    db.pool.query(`SELECT TOP video.title as title, video.length as length, video.thumbnail as thumbnail, video.uploaded as uploaded
                    FROM video
                    ${searchField}
	            LIMIT 200
    ;`, params, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.json(data.rows);
        // pool.end()
    })
}
exports.getVideos = getVideos
