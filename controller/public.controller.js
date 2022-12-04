const {publicValidate} = require('../validate/public.validate')

const register = async(req, res)=>{
    const {error} = await publicValidate(req.body, req.method)
    if (error) return res.status(400).json({message:error.message})
    res.status(200).json({message:"everything is fine"})
}


module.exports={register}