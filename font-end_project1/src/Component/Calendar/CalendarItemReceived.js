import React from "react";
import { Avatar, Box, Button, Card, Typography } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GroupIcon from "@material-ui/icons/Group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Random from "../../Config/random";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi.json";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SubjectIcon from '@material-ui/icons/Subject';
import axios from "axios";
import { toast } from "react-toastify";
import URL from "../../Config/URL";
import { addListScheduleReceived } from "../../features/Calendar/ListScheduleReceived";
const CalendarItem = (props) => {
  const dispath = useDispatch();
  const schedule = props.schedule ; 
  const create_at = schedule.create_at ;
  const startDate = new Date(schedule.startDate); 
  const endDate =new Date(schedule.endDate); 
  const color = ["orange", "yellow", "blue", "pink", "red", "green"];
  const history = useHistory();
  let title;
//   const titleLength = title.length;
//   const indexColor = Math.ceil(titleLength / color.length);
//   const colorAvatar = color[indexColor];
//   title = title.trim();
//   const str1 = title.substring(title.length - 1, title.length);
//   const str2 = title.substring(0, 1);
//   const avataTitle = str2.concat(str1);
    let avataTitle = "TR"
    let colorAvatar = "yellow"
  const showTime = (create_at) => {
    //ham tgian
    let xml;

    const timeAgo = new TimeAgo("vn");

    const d = new Date();

    const t = new Date(create_at);
    console.log(
      "🚀 ~ file: SurveyItems.js ~ line 136 ~ showTime ~ t",
      t.getTime()
    );
    let now = d.getTime() - t.getTime();
    xml = timeAgo.format(new Date() - now);
    console.log("🚀 ~ file: SurveyItems.js ~ line 136 ~ showTime ~ xml", xml);
    return xml;
  };
  const userInfo = useSelector((state) => state.auth.userInfo);
  const schedule1= useSelector(state=>state.ListScheduleReceived.ListScheduleReceived); 
   const acceptSchedule = (schedule)=>{     
    console.log("🚀 ~ file: CalendarItemReceived.js ~ line 77 ~ acceptSchedule ~ accept")
      axios({
        url : URL.changeStatusSchedule, 
        method : "POST", 
        data: { 
           email_user : userInfo.email, 
           status:"ACCEPT", 
           schedule : schedule 
        }
      }).then(data=>{
         console.log("🚀 ~ file: CalendarItemReceived.js ~ line 63 ~ acceptSchedule ~ data", data) 
         if(data.status === 200) {
          const newSchedule1 = schedule1.filter(schedule2=>{
            return schedule2.id !== schedule.id 
         })
         dispath(addListScheduleReceived(newSchedule1)); 
            toast.success("Cap nhat thanh cong !")
         }else{ 
            toast.warning("Co loi ")
         }
      })
   } 
     

   const cancerSchedule =(schedule) => {
     const id = schedule.id ; 
    console.log("🚀 ~ file: CalendarItemReceived.js ~ line 97 ~ cancerSchedule ~ cancer")
    axios({
      url :URL.changeStatusSchedule, 
      method : "post", 
      data: { 
         email_user : userInfo.email, 
         status:"CANCER", 
         schedule : schedule 
      }
    }).then(data=>{
       if(data.status === 200) {
        const newSchedule1 = schedule1.find(schedule2=>{
          return schedule2.id === schedule.id 
       })
        const IndexUpdate = schedule1.findIndex(schedule2=>{
           return schedule2.id === schedule.id 
        })
        console.log("🚀 ~ file: CalendarItemReceived.js ~ line 97 ~ cancerSchedule ~ IndexUpdate", IndexUpdate)
        const updateSchedule  = {
          title : newSchedule1.title , 
          status : "CANCER" , 
          total_number_user_send :newSchedule1.total_number_user_send , 
          id:newSchedule1.id  ,
          startDate :newSchedule1.startDate, 
          endDate : newSchedule1.endDate , 
          allDay : newSchedule1.allDay , 
          notes : newSchedule1.notes , 
          received_to : newSchedule1.received_to , 
          create_at : newSchedule1.create_at 
        }
        const updateListSchedule = schedule1.filter(schedule=>{
           return schedule.id  !== id
        })
       dispath(addListScheduleReceived([...updateListSchedule,updateSchedule]));
          toast.success("Cap nhat thanh cong !")
       }else{ 
         toast.warning("Co loi ")
       }
    })
   }
    
  return (
      <Card style={{ height: "270px", width: "500px", border: "1px solid", marginTop:"10px",position:"relative" }}>
           <Typography
                style={{
                top: 0,
                right: 0,
                position: "absolute",
                margin: "10px",
                color: "blue",
                }}
           >
             {showTime(schedule.create_at)}
          </Typography>
        <Box style={{ margin: "5px" }} display="flex">
          <Box style={{ display: "flex" }}>
            <Avatar
              style={{ marginRight: "2px", backgroundColor: colorAvatar }}
            >
              {avataTitle}
            </Avatar>
          </Box>
          <Box>
            {" "}
            <Typography
              variant="subtitle1"
              style={{ marginLeft: "12px", marginTop: "2px",textAlign:"left"}}
            
            >
              {schedule.title}
            </Typography>
            <Typography
              variant="caption"
              style={{ marginLeft: "12px", marginTop: "2px" }}
            >
              {startDate.toDateString()}
            </Typography> <br></br>
           
          </Box>
          
        </Box>
             <Typography
                 variant="caption"
                style={{ marginLeft: "12px", marginTop: "2px",float:"left"}}
              >
                {schedule.received_to}
             </Typography>
         <Box display="flex" style={{ marginTop: "45px", marginLeft: "5px" }}>
          <SubjectIcon />
                <Typography style={{ marginLeft: "23px" }} variant="subtitle2">
                  {schedule.notes}
                </Typography>
         </Box>
        <Box style={{ marginTop: "15px", marginLeft: "5px" }} display="flex">
        <AccessTimeIcon />
        
          <Typography style={{ marginLeft: "23px" }} variant="subtitle2">
             {startDate.getHours()}:{startDate.getMinutes()===0?"00":startDate.getMinutes()} - {endDate.getHours()}:{endDate.getMinutes()===0?"00":endDate.getMinutes()}
          </Typography>
        </Box>
        <Box display="flex" style={{ marginTop: "15px", marginLeft: "5px" }}>
          <GroupIcon />
                <Typography style={{ marginLeft: "23px" }} variant="subtitle2">
                  {schedule.total_number_user_send} người tham gia 
                </Typography>
        </Box>
       
        <Box style ={{width:"100%",marginTop :"15px"}}>
          <Button onClick={()=>cancerSchedule(schedule)} style={{float:"right",marginRight:"8px"}} variant ="contained" color="secondary">Từ chối</Button>
          <Button onClick ={()=>acceptSchedule(schedule)} style={{float:"left",marginLeft:"8px"}} variant ="contained" color="primary">Đồng ý </Button>
       
           
        </Box>
      </Card>
    
  );
};

export default CalendarItem;
