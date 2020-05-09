const db = require("../db");

const getCaptions = function(req, res) {
  var regDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  const keyword = req.query.keyword;
  const title = req.query.title;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const start = req.query.start ? parseInt(req.query.start) : 0;
  if (isNaN(start)) {
    start = 0;
  }
  const params = [];
  let paramCount = 0, keywordField = '', titleField = '', startDateField = '', endDateField = '';
  if (keyword && keyword.length > 0) {
    keywordField = `WHERE caption.text ILIKE $${++paramCount}`;
    params.push("%" + keyword + "%");
  }
  if (title && title.length > 0) {
    titleField = `${paramCount > 0 ? 'AND' : 'WHERE'} video.title ILIKE $${++paramCount}`;
    params.push("%" + title + "%");
  }
  if (startDate && startDate.match(regDate)) {
	  startDateField = `${paramCount > 0 ? 'AND' : 'WHERE'} video.uploaded >= $${++paramCount}`;
	  params.push(startDate);
  }
  if (endDate && endDate.match(regDate)) {
	  endDateField = `${paramCount > 0 ? 'AND' : 'WHERE'} video.uploaded <= $${++paramCount}`;
	  params.push(endDate);
  }

  db.pool.query(
    `SELECT caption.id, caption.video_id, caption.text as text, caption.time as time, video.title as title, video.length as length, video.thumbnail as thumbnail, video.uploaded as uploaded, count(*) OVER() AS full_count
                    FROM caption
                    JOIN video ON caption.video_id = video.id
                    ${keywordField}
                    ${titleField}
					${startDateField}
					${endDateField}
                ORDER BY video.uploaded DESC, video.title DESC, caption.time DESC
	    	        LIMIT 50 OFFSET ${start}
	;`,
    params,
    (err, data) => {
      if (err) {
        console.log(err);
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
        res.json(null);
      }
      // pool.end()
    }
  );
};
exports.getCaptions = getCaptions;
