import fireBase from "../utils/firebaseConfigration.js";

export const isVerifyFirebaseToken = async (req, res, next) => {
    const { idToken } = req.body;
    console.log(idToken)
    try {
      const decodedToken = await fireBase.auth().verifyIdToken(idToken);
      console.log(decodedToken);
      req.user = {...req.user, userData: decodedToken};
      next();
    } catch (error) {
      return res.status(401).send('Unauthorized');
    }
  };