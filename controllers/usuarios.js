
const { response, request } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) =>{

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res= response)=>{

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar correo.

    // Encriptar contraseña.
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en bd
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res= response)=>{

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //Validar contra base de datos
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - Controlador',
        usuario

    });
}


const usuariosPatch = (req, res)=>{
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = async(req, res)=>{

    const {id} = req.params;

    // borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    // res.json(usuario);

    //Cambiar estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario)

}

module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}