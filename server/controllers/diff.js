
const diffCalc = (req, res) => {
    let resp = req.body;
    let td = calculateDiff(resp.views, resp.comments, resp.likes, resp.shares, resp.subscribers);
    return res.status(200).json({
        status : "success",
        message : {
            "total_difficulty" : td
        }
    });
};

const calculateDiff = (views, comments, likes, shares, subscribers) => {
    let vp = viewPointCalc(views);
    let cp = viewPointCalc(comments);
    let lp = viewPointCalc(likes);
    let sp = commentPointCalcc(shares);
    let subp = viewPointCalc(subscribers);
    let td = vp+cp+lp+sp+subp;
    if(td == 0) td =1;
    return td
}

const viewPointCalc = views => {
    var point;
    if(views < 1){
        point = 0;
    }else if (views >= 1 && views <= 100){
        point = 2;
    }else if (views >= 100 && views <= 500){
        point = 4;
    }else if (views >= 500 && views <= 1000){
        point = 6;
    }else if (views >= 1000 && views <= 2500){
        point = 8;
    }else if (views >= 2500 && views <= 5000){
        point = 10;
    }else if (views >= 5000 && views <= 10000){
        point = 12;
    }else if (views >= 10000 && views <= 100000){
        point = 14;
    }else if (views >= 100000 && views <= 500000){
        point = 16;
    }else if (views >= 500000 && views <= 1000000){
        point = 18;
    }else if (views > 1000000){
        point = 20;
    }
    return point;
};

const commentPointCalcc = comments => {
    var point;
    if(comments < 1){
        point = 0;
    }else if(comments >= 1 && comments <= 5){
        point = 2;
    }else if(comments >= 5 && comments <= 10){
        point = 4;
    }else if(comments >= 10  && comments <= 15){
        point = 6;
    }else if(comments >= 15 && comments <= 20){
        point = 8;
    }else if(comments >= 20 && comments <= 25){
        point = 10;
    }else if(comments >= 25 && comments <= 35){
        point = 12;
    }else if(comments >= 35 && comments <= 45){
        point = 14;
    }else if(comments >= 45 && comments <= 55){
        point = 16;
    }else if(comments >= 55 && comments <= 65){
        point = 18;
    }else if(comments >= 65 && comments <= 100){
        point = 20;
    }else if(comments > 100){
        point = 20
    }
    return point;
};

module.exports = {
                    diffCalc :  diffCalc,
                    calcDiff : calculateDiff
                };