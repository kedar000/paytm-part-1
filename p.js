const { JWT_SECRET } = require("./backend/config");

const authMiddleware = (req , res , next )=>{
    const authent = req.headers.authorizaton ;
    if( !authent || authent.startWith('Bearar')){
        return req.status(411).json({})
    }

    const token = authent.split(' ')[1];

    try {
        const decode = jwt.verify(token , JWT_SECRET);

        req.userId = decode.userId;
        next();
    } catch (error) {
        
    }


}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ4NDRlOTgyYjhmNWE0OGM3MWFmNzQiLCJpYXQiOjE3MTYwMTIyNjV9.fl0qJypIwlk2RokP2ijAGg0oCp_4n486pj8NcMMsgPE
// t - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ4NDU1YjgyYjhmNWE0OGM3MWFmN2EiLCJpYXQiOjE3MTYwMTIzODB9.Y4GtB_DlKTSxtXS_7yjCe8Kk0E6k3VWGM12kpyMiUnE
// s - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ4NDU3YTgyYjhmNWE0OGM3MWFmN2YiLCJpYXQiOjE3MTYwMTI0MTB9.0Lta2BG2KUepG8M69UswCruStfkyUX46anBswRNmtOs