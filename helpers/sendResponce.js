const sendResponce = async (res, status, error, data, message) => {
    return res.status(status).send({
        data,
        error,
        message
    })
}

export default sendResponce