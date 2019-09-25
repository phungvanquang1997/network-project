const http = require('http')
const fs = require('fs')
const express = require('express')
const app = express()
const port = 4000
const formidable = require('formidable')

http.createServer((req, res) => {
	if (req.url == '/fileupload') {
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
		  res.write('File uploaded');
		  res.end();
		});
	  } else {
		return res.end();
	  }
})

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	return res.render('pages/index');
	/*res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();*/
})

app.post('/fileupload', (req, res) => {
	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = './uploads/' + files.filetoupload.name;

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        //res.write('File uploaded and moved!');
        //res.end();
	  });

	  
	})
	return res.send("Thành công!")
})

app.get('/getAllFilesFromFolder', (req,res) => {
	var results = []
	const dir = './uploads/'
	fs.readdirSync(dir).forEach(element => {
		const file = dir + element
		
		const stat = fs.statSync(file)

		if (stat && stat.isDirectory()) {
			results = results.concat(_getAllFilesFromFolder(file))
		} else {
			const fn = {
				fileName: element,
				size: Math.round((stat.size / 1024) * 100) /100,
				ext: element.split('.').pop(),
			}

			results.push(fn);
		}
	});
	return res.send(results);
})

app.get('/download', (req, res) => {
	const file = req.query.file_name;
	const dirFile = './uploads/'+ file;
  res.download(dirFile); // Set disposition and send it.
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))