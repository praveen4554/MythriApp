var app=angular.module('myApp', ['ngMaterial','ui.bootstrap.modal','ui.grid','ui.grid.selection','sy.bootstrap.timepicker',
  'template/syTimepicker/timepicker.html','template/syTimepicker/popup.html','firebase']);
app.controller('tableController',['$scope','$uibModal','$location','$http','$filter','mySharedService','$firebaseArray',function($scope,$uibModal,$location,$http,$filter,mySharedService,$firebaseArray){
    var index;
    var arr=[];
    var persons=[];
        var ref = new Firebase("https://blazing-torch-7690.firebaseio.com/-KDYOQNqci5M3oaHlGMO");

    //$scope.interview=["Coding Test","Phone","Phone-Coding","Skype","WebEx","Hangouts","BlueaJeans"];
// we can get its id using key()
// now it is appended at the end of data at the server
    $scope.notes=$firebaseArray(ref);
    
    $scope.gridOptions = {
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 50
  }; //grid
    $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope
      $scope.gridApi = gridApi;

      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        //Do something when a row is selected
        
        if(row.isSelected==true)
        {
            arr[arr.length]=row.entity.id;
            console.log(row.entity.id+"len");
        }
        else
        {
            for(i=0;i<arr.length;i++)
            {
                if(arr[i]==row.entity.id)
                {
                    arr.splice(i,1);
                }
            }
        }
        console.log("length"+arr.length);
        if(arr.length>0)
        {
                $scope.upd=false;
                var len=$scope.gridOptions.data.length;
                for(var i=0;i<len;i++)
                {
                    if($scope.gridOptions.data[i].id==arr[arr.length-1])
                    {
                        index=i;
                        break;
                    }
                }
        }
        else
        {
            $scope.upd=true;
        }
      });
      
    };
    $scope.gridOptions.columnDefs = [{
            name: 'Interview Date',
            field: 'interviewdate'
        },{
            name: 'Interview Timing',
            field: 'interviewtiming'
        },{
            name: 'Consultant Name',
            field: 'consultantname'
        },{
            name: 'InterviewType',
            field: 'interviewtype'
        },{
            name: 'Client/Vendor',
            field: 'client'
        },{
            name: 'Proxy',
            field: 'proxy'
        },{
            name: 'Marketing By',
            field: 'Marketingby'
        },{
            name: 'Comments',
            field: 'comments'
        }];
        function PersonsPush(person){
          var numOfPersons = person.length;
    for (var i = 0; i < numOfPersons; i++) {
      persons.push({
        test:person[i].test
      });
    }
    $scope.interview=persons;
        }

        function PersonsProxy(person){
          var numOfPersons = person.length;
          persons=[];
    for (var i = 0; i < numOfPersons; i++) {
      persons.push({
        proxy:person[i].proxy
      });
    }
    $scope.ProxyData=persons;
        }

        function PersonsMarket(person){
          var numOfPersons = person.length;
          persons=[];
    for (var i = 0; i < numOfPersons; i++) {
      persons.push({
        name:person[i].name
      });
    }
    $scope.MarketedData=persons;
        }

        function EmailNotifications(person){
          var numOfPersons = person.length;
          persons=[];
    for (var i = 0; i < numOfPersons; i++) {
      persons.push({
        name:person[i].name,
        mail:person[i].mail
      });
    }
    $scope.EmailData=persons;
        }
        $scope.test=1;

    $http.get('/signin').then(function(){
                console.log("success");
                $http.get('../Json/interviewdata.json').success(function(data){
                var person_json = data.interview;
                var proxy_json=data.proxy;
                $scope.mail=data.Email;
                $scope.person_json=person_json;
                $scope.MarketedBy_json=data.MarketingBy;
                $scope.proxy_json=proxy_json;
                 PersonsPush($scope.person_json);
                 PersonsProxy($scope.proxy_json);
                 PersonsMarket($scope.MarketedBy_json);
                 EmailNotifications($scope.mail);
                });
            }).catch(function(error){
            console.log("error");
         });


    $http.get('/signin'+"q").then(function(responce){
                $scope.uname=responce.data.username;
                console.log("success"+responce.data.username);
            }).catch(function(error){
            console.log("error");
         });

    $scope.gridload=function(){
    $scope.notes.$loaded().then(function(notes) {
     $scope.gridOptions.data=notes;// data is loaded here
     //console.log("id"+$scope.notes[5].$id);
                $scope.gridAdd($scope.persons[$scope.persons.length-1]);
    });
    }
    $scope.refresh=function(){
    $http.get('/signin').then(function(responce){
                console.log("success1"+responce.data);
                var persons=responce.data;
                $scope.persons=persons;
                //$scope.gridOptions.data = persons;
                $scope.search=persons;
                $scope.ud=false;
                //newChildRef.set($scope.gridOptions.data);
                //PersonsPush($scope.person);
                $scope.gridload();
            }).catch(function(error){
            console.log("error");
         });
    }
    $scope.refresh();
    $scope.upd=true;
	var i=0;
    $scope.gridAdd=function(persons){
            console.log("length of the grid"+$scope.gridOptions.data.length+"new"+$scope.persons.length);
        if($scope.persons.length>$scope.gridOptions.data.length)
        {
            //console.log("length of the notes"+$scope.notes[0]._id);
            console.log("check id"+persons._id+"proxy"+persons.proxy);
            persons.id=persons._id;
            $scope.notes.$add(persons);
            /*var id=$scope.notes[$scope.notes.length-1].$id;
            var fredid = new Firebase("https://blazing-torch-7690.firebaseio.com/-KDYOQNqci5M3oaHlGMO" + '/' +id);
            fredid.$update({"_id":persons._id});

            //console.log("check"+$scope.notes[length-1]._id);*/
        }

    };
  //$scope.persons=persons;
  $scope.showSelectValue = function(mySelect) {
                    $scope.itype=mySelect;
                }
                $scope.showSelectProxy = function(Proxy) {
                    $scope.proxy=Proxy;
                }
                $scope.showSelectMarket = function(Market) {
                    $scope.market=Market;
                }
            $scope.addrow=function(){
                    var date="";
                    console.log($scope.timing);
                    if($scope.idate.getDate()<10)
                    {
                        date+="0"+$scope.idate.getDate();
                    }
                    else
                    {
        
                        date+=$scope.idate.getDate();
                    }
                if($scope.idate.getMonth()<9)
                    {
                        date+="-0"+($scope.idate.getMonth()+1);
                    }
                    else
                    {
                        date+="-"+($scope.idate.getMonth()+1);
                    }
                    date+="-"+$scope.idate.getFullYear();
                    $scope.idate=date;
                    for(var i=0;i<$scope.EmailData.length;i++)
                    {
                        if($scope.EmailData[i].name==$scope.proxy)
                        {
                            var mail=$scope.EmailData[i].mail;
                        }
                    }
            $http.post('/insert',{"mail":mail,"interviewdate":$scope.idate,"interviewtime":$scope.timing,"consultantName":$scope.cname,"interviewtype":$scope.itype,"client":$scope.cv,"proxy":$scope.proxy,"Marketingby":$scope.market,"comments":$scope.cmnts}).then(function(responce){
                console.log("success");
                $scope.refresh();
            }).catch(function(error){
            console.log("error");
         });
                $scope.cname="";
                $scope.cv="";
                $scope.cmnts="";
                $scope.mySelect=0;
                $scope.Proxy=0;
                $scope.Market=0;
                $scope.idate=null;
                $scope.timing=null;
            }
            $scope.add=function(){
                $scope.ud=false;
                $scope.ad=true;
            }
            
            /*$scope.checked=function(row) {
                // body...
                var ind = $scope.gridOptions.data.indexOf(row.entity);
            alert($scope.gridOptions.data[0].proxy);
                index=row;
                for(i=0;i<$scope.persons.length;i++)
                {
                    if($scope.persons[i].isChecked)
                    {

                        $scope.upd=false;
                        index=i;
                        break;
                    }
                    else
                    {
                        $scope.upd=true;
                    }
                }
            }*/
            $scope.delete = function() {
                var len=arr.length;
                for(var i=0;i<len;i++)
                {
                            var a=arr[i];
                            var itemRef="";
                            //console.log("ok deleted");
                            for(var j=0;j<$scope.gridOptions.data.length;j++)
                            {
                                //console.log("check"+j);
                                if($scope.notes[j].id===a)
                                {

                                console.log($scope.notes[j].id+"check"+a);
                                 itemRef = new Firebase("https://blazing-torch-7690.firebaseio.com/-KDYOQNqci5M3oaHlGMO" + '/' +$scope.notes[j].$id);
                                console.log(itemRef+"deleted");
                                itemRef.remove();
                                break;
                               }
                            }   
                            $http.delete('/delete'+a).then(function(responce){
                            console.log(responce);
                        });
                }
                $scope.upd=true;

            }
            $scope.update=function(){
                $scope.ad=false;
                $scope.ud=true;
                if(index==undefined)
                {
                    console.log("select the checkbox");
                }
                else
                    {
                        $scope.open=true;
                        var date=$scope.gridOptions.data[index].interviewdate.split("-");
                        var pass=date[1]+"-"+date[0]+"-"+date[2];
                        $scope.id=$scope.gridOptions.data[index].id;
                        $scope.idate=new Date(pass);
                        $scope.timing=$scope.gridOptions.data[index].interviewtiming;
                        $scope.cname=$scope.gridOptions.data[index].consultantname;
                        //$scope.itype=$scope.gridOptions.data[index].interviewtype;
                        $scope.cv=$scope.gridOptions.data[index].client;
                        $scope.mySelect=$scope.gridOptions.data[index].interviewtype;
                        $scope.Proxy=$scope.gridOptions.data[index].proxy;
                        $scope.Market=$scope.gridOptions.data[index].Marketingby;
                        $scope.cmnts=$scope.gridOptions.data[index].comments;
                        arr.splice(arr.length-1,1);
                        console.log("length in update"+$scope.idate);
                    }
             }
             $scope.change=function(){
                var date="";
                    if($scope.idate.getDate()<10)
                    {
                        date+="0"+$scope.idate.getDate();
                    }
                    else
                    {
        
                        date+=$scope.idate.getDate();
                    }
                if($scope.idate.getMonth()<9)
                    {
                        date+="-0"+($scope.idate.getMonth()+1);
                    }
                    else
                    {
                        date+="-"+($scope.idate.getMonth()+1);
                    }
                    date+="-"+$scope.idate.getFullYear();
                    $scope.idate=date;
                    for(var i=0;i<$scope.EmailData.length;i++)
                    {
                        if($scope.EmailData[i].name==$scope.proxy)
                        {
                            var mail=$scope.EmailData[i].mail;
                        }
                    }
                $http.post('http://localhost:8090/update',{"mail":mail,"id":$scope.id,"interviewdate":$scope.idate,"interviewtime":$scope.timing,"consultantName":$scope.cname,"interviewtype":$scope.mySelect,"client":$scope.cv,"proxy":$scope.Proxy,"Marketingby":$scope.Market,"comments":$scope.cmnts}).then(function(responce){
                console.log("success");
                $scope.changedVal={"id":$scope.id,"interviewdate":$scope.idate,"interviewtiming":$scope.timing,"consultantname":$scope.cname,"interviewtype":$scope.mySelect,"client":$scope.cv,"proxy":$scope.Proxy,"Marketingby":$scope.Market,"comments":$scope.cmnts};
                console.log($scope.changedVal.consultantname+"got it"+$scope.cname);
                $scope.refresh();
          $scope.gridupdate($scope.changedVal);
            }).catch(function(error){
            console.log("error");
            });
             }

        $scope.refreshData = function() {
            $scope.gridOptions.data = $filter('filter')($scope.search, $scope.fname, undefined);
        };
        $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            };
            $scope.time=function(){
                var time="";
                    if($scope.timing.getHours()<10)
                    {
                        time+="0"+$scope.timing.getHours();
                    }
                    else
                    {
        
                        time+=$scope.timing.getHours();
                    }
                if($scope.timing.getMinutes()<10)
                    {
                        time+=":0"+$scope.timing.getMinutes();
                    }
                    else
                    {
                        time+=":"+$scope.timing.getMinutes();
                    }
                if($scope.timing.getSeconds()<10)
                    {
                        time+=":0"+$scope.timing.getSeconds();
                    }
                    else
                    {
                        time+=":"+$scope.timing.getSeconds();
                    }
                    $scope.timing=time;
                console.log(time);
            }
            $scope.gridupdate=function(changedVal){
                console.log($scope.changedVal+"hi");
                for(var i=0;i<$scope.notes.length;i++)
                            {
                                if($scope.notes[i].id===$scope.changedVal.id)
                                {
                                var itemRef = new Firebase("https://blazing-torch-7690.firebaseio.com/-KDYOQNqci5M3oaHlGMO" + '/' +$scope.notes[i].$id);
                                itemRef.update($scope.changedVal);
                                console.log($scope.notes[i].consultantname+"ok"+$scope.changedVal.consultantname);
                                break;
                               }
                            }

            }
        }]);