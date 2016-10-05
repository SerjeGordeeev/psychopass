/**
 *
 * @param req
 * @param res
 * @param defaultParams {}
 */
exports.uploadFile = function(req, res, defaultParams) {
	
	let multiparty = require('multiparty');
	const parse = require('./parser').parseHostList

	let fs = require('fs');
	let form = new multiparty.Form();

	form.on('file', function(name,file){
		let tmp_path = file.path
		let hosts = parse(fs.readFileSync(tmp_path).toString().split('\n'), defaultParams)
		clearHostsObj(hosts)
		res.send(hosts)
	});

	form.parse(req);


	function clearHostsObj(hosts){
		hosts.map((host)=>{
			if(host.parentHost) delete host.parentHost
			if(host.childHosts) clearHostsObj(host.childHosts)
		})
	}
	
	
};