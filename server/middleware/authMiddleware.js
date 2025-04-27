

// export const protect = async (req,res,next) => {
//     const token = req.cookies.token

//     if(!token){
//         return res.status(401).json({message:'Not Authorized'})
//     }

//     try {
//         const decoded = jwt.verify(token,jwtSecret)
//         req.user = await userModel.findById(decoded.id)
//         next()
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({message:'Unauthorized, Token failed'})
//     }
    
// }

