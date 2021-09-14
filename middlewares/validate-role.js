const { request, response } = require("express")

const adminRol = (req = request, res = response, next) => {

    if (!req.user) {
        res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN') {
        return res.status(401).json({
            msg: `${name} no es administrador - no puede hacer esta acción`
        });
    }
    next();
}

const existRole = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `El servicio require uno de los siguientes roles: ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    adminRol,
    existRole,
}