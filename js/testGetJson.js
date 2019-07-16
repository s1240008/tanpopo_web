var TanpopoProject20190411;
$.ajax({
        url     : '../js/editedTanpopoProject20190411_20190711.json',
        type    : 'GET',
        dataType: 'json',
        success : function(result) {
           //成功時の処理
            TanpopoProject20190411=result;
            //console.log(TanpopoProject20190411);
            searchYear();
            makeTable();
        }
});

var dataYear = [];
var searchYear=function(){
    var re4=/[0-9]{4}/g;
    var re2=/[0-9]{2}/g;
    
    for(var i in TanpopoProject20190411){
        //console.log(i);
        var rd_match;
        var rd = TanpopoProject20190411[i]['ReleaseDate'];
        if(rd.match(re4)==null){
            rd_match=rd.match(re2);
            if(rd_match!=null){
                rd_match=rd_match.sort();
                rd_match=rd_match[0]
            }
            dataYear.push({id:TanpopoProject20190411[i]['ID'],year:rd_match});
        }
        else{
            rd_match=rd.match(re4);
            rd_match=rd_match.sort();
            dataYear.push({id:TanpopoProject20190411[i]['ID'],year:rd_match[0]});
        }
    }
    dataYear = dataYear.sort(function(a,b){
                             if(a.year>b.year)return 1;
                             else return -1;
                             })

    for(i in dataYear){
        if(dataYear[i].year<'2000'&&dataYear[i].year!=null)dataYear[i].year=20+dataYear[i].year
    }

    dataYear = dataYear.sort(function(a,b){
                             if(a.year>b.year)return 1;
                             else return -1;
                             })
}

var dataTag = ['ID','DOI','Paper Title','Author','URL','Jounal','ReleaseDate','Note'];

var makeTable = function(){
    var tr = document.createElement('tr');
    tr.innerHTML = '<th>title</th><td>year</td>';
    document.getElementById('testTable').appendChild(tr);

    var title,year;
    for(var i in dataYear){
        var data = TanpopoProject20190411[dataYear[i].id-1];
        //console.log(dataYear);
        title = data['Paper Title'];
        //console.log(data["﻿ID"]+':'+data['Paper Title']);
        year = dataYear[i].year;
        if(i==0||year!==dataYear[i-1].year){
            tr = document.createElement('tr');
            tr.innerHTML = '<th colspan=2>'+year+'</th>';
            document.getElementById('testTable').appendChild(tr);
        }
        tr = document.createElement('tr');
        tr.innerHTML = '<th class=\'title\' id=\''+data['ID']+'\'>'+title+'</th><td>'+year+'</td>';
        document.getElementById('testTable').appendChild(tr);
        
        var table = document.createElement('table');
        table.style.display = 'none';
        table.setAttribute('id','table'+data['ID']);
        table.setAttribute('class','testTable');

        for(var j in dataTag){
            //console.log(data['Journal']);
            if(j==2){
                table.innerHTML +='<th>'+dataTag[j].charAt(6).toUpperCase()+dataTag[j].substring(7,dataTag[j].lenth)+'</th><td>'+data[dataTag[j]]+'</td>';
            }
            else if(j==4){
                table.innerHTML +='<th>'+dataTag[j].charAt(0).toUpperCase()+dataTag[j].substring(1,dataTag[j].lenth)+'</th><td>'+'<a href="'+data[dataTag[j]]+'" target="new">'+data[dataTag[j]]+'</a>'+'</td>';}
            else if(data[dataTag[j]]==""||data[dataTag[j]]=="-"){
                table.innerHTML +='<th>'+dataTag[j].charAt(0).toUpperCase()+dataTag[j].substring(1,dataTag[j].lenth)+'</th><td style="color:red;,font-weight: 900;">NO DATA</td>';
            }
            else{
                table.innerHTML +='<th>'+dataTag[j].charAt(0).toUpperCase()+dataTag[j].substring(1,dataTag[j].lenth)+'</th><td>'+data[dataTag[j]]+'</td>';
            }
        }

        document.getElementById('testTable').appendChild(table);
    }
}

var slideTable = function(id){
    //console.log(id);
    //$(function(id){$('#teble'+id).slideToggle()});
}
$(function(){
  $('.title').on('click',function(){
            var id =  $(this).attr("id");
            $('#table'+id).slideToggle();
            console.log(id);
    });
  });

//その論文が出た雑誌(ジャーナル：学術論文)名（Science など）の号、年
//DOI
