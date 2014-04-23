module.exports = {
	extractEntidades : function(){
		require('async');
		Representante.find({}).exec(function(e,representantes){
			async.mapSeries(representantes,extractEntidad,function(err,res){
				if(err){console.log(err); throw err};				
				console.log('Reps Procesados: %d',res.length);
			});
		});
	}	
};

var extractEntidad = function(rep,callback){
	Entidad.findOrCreate({nombre:rep.estado},{nombre:rep.estado},function(e,entidad){
		if(e) return callback(e,entidad);
		rep.entidad = entidad.id;
		rep.save(callback);
	})
}
