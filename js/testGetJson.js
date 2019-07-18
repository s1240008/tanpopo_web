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
var yearSet = [];
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
    addYearSelect();
}

var addYearSelect = function(){
    //console.log(dataYear);
    
    for(i in dataYear){
        if(i==0)yearSet.push(dataYear[i].year);
        else if(dataYear[i-1].year!==dataYear[i].year)yearSet.push(dataYear[i].year);
    }
    //console.log(yearSet);
    var option = document.createElement('option');
    option.value = 'pleaseSelect';
    option.innerHTML = '選択してください';
    document.getElementById('year').appendChild(option);

    for(i in yearSet){
        option = document.createElement('option');
        option.value = yearSet[i];
        if(yearSet[i]==null)option.innerHTML = 'null';
        else option.innerHTML = yearSet[i];
        document.getElementById('year').appendChild(option);
    }
    
    
}

var yearChange= function(){
    var selectedYear = document.getElementById('year').value;
    $('#testTable').children().remove();
    if(selectedYear=='pleaseSelect'){
        makeTable();
    }
    else{
      remakeTable(selectedYear);
    }
}

var remakeTable = function(selectedYear){
    //|title|year|
    var tr = document.createElement('tr');
    var f = 0;
    tr.innerHTML = '<th>title</th><td>year</td>';
    document.getElementById('testTable').appendChild(tr);
    
    var title,year;
    for(var i in dataYear){
        var data = TanpopoProject20190411[dataYear[i].id-1];
        title = data['Paper Title'];
        year = dataYear[i].year+'';

        //console.log(year+' '+toString.call(year)+' '+selectedYear+' '+toString.call(selectedYear));
        //|year|
        if(year===selectedYear){
            if(f==0){
                addYear(year);
                f=1;
            }
            addPaperTitleAndYear(data,title,year);
            addPaperTable(data);
        }
    }
}

var dataTag = ['ID','DOI','Paper Title','Author','URL','Jounal','ReleaseDate','Note'];

var makeTable = function(){
    //|title|year|
    var tr = document.createElement('tr');
    tr.innerHTML = '<th>title</th><td>year</td>';
    document.getElementById('testTable').appendChild(tr);

    var title,year;
    for(var i in dataYear){
        var data = TanpopoProject20190411[dataYear[i].id-1];
        title = data['Paper Title'];
        year = dataYear[i].year;
        //|year|
        if(i==0||year!==dataYear[i-1].year){
            addYear(year);
        }
        addPaperTitleAndYear(data,title,year);
        addPaperTable(data);
    }
}

var addYear = function(year){
    tr = document.createElement('tr');
    tr.innerHTML = '<th colspan=2>'+year+'</th>';
    document.getElementById('testTable').appendChild(tr);
}

var addPaperTitleAndYear = function(data,title,year){
    //|paper title|year|
    var tr = document.createElement('tr');
    tr.innerHTML = '<th class=\'title\' id=\''+data['ID']+'\'>'+title+'</th><td>'+year+'</td>';
    document.getElementById('testTable').appendChild(tr);
}

var addPaperTable = function(data){
    //console.log(data);
    //paper data
    var table = document.createElement('table');
    table.style.display = 'none';
    table.setAttribute('id','table'+data['ID']);
    table.setAttribute('class','testTable');
    
    for(var j in dataTag){
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

$(function(){
  $('.title').on('click',function(){
            var id =  $(this).attr("id");
            $('#table'+id).slideToggle();
            console.log(id);
    });
  });


//その論文が出た雑誌(ジャーナル：学術論文)名（Science など）の号、年
//DOI
