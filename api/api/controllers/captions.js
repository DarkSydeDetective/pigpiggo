const db = require('../db')

const getCaptions = function (req, res) {
    const search = req.query.search;
    const searchField = search && search.length > 0 ? `WHERE caption.text ILIKE $1` : '';
    const params = searchField === '' ? [] : ['%' + search + '%'];

   db.pool.query(`SELECT caption.id, caption.video_id, caption.text as text, caption.time as time, video.title as title, video.length as length, video.thumbnail as thumbnail, video.uploaded as uploaded
                    FROM caption
                    JOIN video ON caption.video_id = video.id
                    ${searchField}
                ORDER BY video.uploaded DESC
	    	    LIMIT 200
    ;`, params, (err, data) => {
        if (err) {
            console.log(err)
        }
        if (data) {
          /*
          for(let r in data.rows){
            const id = parseInt(row.id)
            const video_id = parseInt(row.video_id)
            if (id > 1) {
              const before = await db.pool.query(`SELECT caption.text from caption where caption.id = ${id - 1} and caption.video_id = ${video_id}`)
              const after = await db.pool.query(`SELECT caption.text from caption where caption.id = ${id + 1} and caption.video_id = ${video_id}`)
              row.text = `${before} ${row.text} ${after}`
            }
          }
*/
          res.json(data.rows);
        } else {
          res.json(null)
        }
        // pool.end()
    })
}
exports.getCaptions = getCaptions
