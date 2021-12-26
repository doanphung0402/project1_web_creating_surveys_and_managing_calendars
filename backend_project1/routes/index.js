import express from 'express';
import SignupRouter from './signup'; 
import SigninRouter from './signin'; 
import SurveyRoute from './survey'; 
import CalendarRoute from './Calendar'; 
import oauth from './oauth';
import auth from './auth';
import '../Service/oauth'
var router = express.Router();
router.use("/signup",SignupRouter);
router.use("/login",SigninRouter); 


router.use("/auth",oauth)


router.use(auth) ; 



router.use("/survey",SurveyRoute); 
router.use("/scheduler",CalendarRoute);










export default router ; 
