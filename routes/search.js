var express = require('express');
var router = express.Router();

SphinxClient = require ("sphinxapi");

/* GET home page. */
router.get('/goods', function(req, res, next) {
  //res.locals.loginbean = req.session.loginbean;
  keywords = req.query.keywords
  kwArr = keywords.split(' ');
  len = kwArr.length;
  keyword = '';
  for(i=0;i<len;i++){
  	if(kwArr[i]!=''){
  		keyword +=kwArr[i]+'|';
  	}
  }
  	var cl = new SphinxClient();
	cl.SetServer('localhost', 9312);
	cl.SetMatchMode(SphinxClient.SPH_MATCH_ANY);		//或运算
	cl.Query('keyword','goods',function(err, result) {
	        if(err){
	        	console.log(err);
	        	console.log('-------有错-----------');
	        	ressend(err);
	        	return;
	        }
	        sql = 'select s.id,gid,s.shopname,s.lng,s.lat,g.goodsname,g.goodsimg,g.goodsintro,g.price,g.praise from goods g,shops s where g.id=? and g.shopid=s.id';
	        rsArr=[];
	        
	        for(var key in result['matches']){ //循环查出的id
			goodsid = result['matches'][key].id;
			 sequelize.query(sql,{replacements:[goodsid],type:sequelize.QueryTypes.QUERY}).then(function(rs){
			 	rsGoods.push(rs[0]);

			 })

		}
			
	});
  //res.render('index', { });
});

module.exports = router;
