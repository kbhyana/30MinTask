          var arr;
          var scoreO=0;
          var scoreX=0;
          var i = 'X'; // which player turn it is
          var win =0;  // if anyone wins or not
          var count = 0; // count number of moves
          var Oname; //player O username
          var Xname; //player X username
          var O=[]; // array to check if game over or not
          var X=[];
          var idX; //player O id
          var idO; //player X id

            function alertpage(msg){
                $("#alert").css("display", "block");
                document.getElementById("alert").innerHTML=msg;
                
            }
          //Prints which player turn it is
          function turn(i){
              document.getElementById("turn").innerHTML="Player "+ i+ " turn !"
          }
            //to reset game
            function reset(){
              i = 'X';
              document.getElementById("turn").innerHTML="Player O turn !"
              win =0;
              count = 0;
              O=[];
              X=[];
                //window.setTimeout($("#alert").css("display", "none"),3000);
                for(var j=1;j<10;j++){
                    document.getElementById(j).innerHTML=j;
                }
            }
          function change( ){
              if(i=='X')
                  {
                      turn(i);
                      i = 'O';
                      
                      
                  }
              else
                  {turn(i);
                  i='X';
                      
                  }
          }
            //to check when game ends
          function check(id){
              if(i=='O'){
                
                  O.push(id);
              if(O.includes("1") & O.includes("2") & O.includes("3") | 
              O.includes("4") & O.includes("5") & O.includes("6") |
              O.includes("7") & O.includes("8") & O.includes("9") |
              O.includes("1") & O.includes("4") & O.includes("7") | 
              O.includes("2") & O.includes("5") & O.includes("8") |
              O.includes("3") & O.includes("6") & O.includes("9") |
              O.includes("1") & O.includes("5") & O.includes("9") | 
              O.includes("3") & O.includes("5") & O.includes("7"))
                  { //setTimeout(125);
                      setTimeout(alertpage(i +' wins'), 125);
                      win =1;
                      reset();
                      scoreX=scoreX-5;
                      scoreO=scoreO+10;
                      displayo();
                      displayx();
                      update();
                      /*for(var i=0; i<arr.length;i++)
                          {
                              if(arr[i].username==Oname)
                                  {
                                      update(arr[i].id,Oname,scoreO);
                                  }
                              if(arr[i].username==Xname)
                                  {
                                      update(arr[i].id,Xname,scoreX);
                                  }
                          }*/
                  }

                 }
              if(i=='X')
                  {
                      X.push(id);
                       if(X.includes("1") & X.includes("2") & X.includes("3") | 
              X.includes("4") & X.includes("5") & X.includes("6") |
              X.includes("7") & X.includes("8") & X.includes("9") |
              X.includes("1") & X.includes("4") & X.includes("7") | 
              X.includes("2") & X.includes("5") & X.includes("8") |
              X.includes("3") & X.includes("6") & X.includes("9") |
              X.includes("1") & X.includes("5") & X.includes("9") | 
              X.includes("3") & X.includes("5") & X.includes("7"))

                  {    // setTimeout(125);
                      setTimeout(alertpage(i +' wins'), 125);
                      win=1;
                      setTimeout(reset(), 125);
                      scoreO=scoreO-5;
                      scoreX=scoreX+10;
                      displayo();
                      displayx();
                       update();
                    /*  for(var i=0; i<arr.length;i++)
                          {
                              if(arr[i].username==Oname)
                                  {
                                      update(arr[i].id,Oname,scoreO);
                                  }
                              if(arr[i].username==Xname)
                                  {
                                      update(arr[i].id,Xname,scoreX);
                                  }
                          }*/
                  }
                  }
              if(count==9 && win==0)
                  {
                      alertpage("draw");
                      reset();
                  }
                 
          }
          // update the winner and loser points to database
          function update(){
              console.log(idO,Oname, scoreO);
              var url1 = "http://localhost:65234/api/Users/"+idO;
              dat={
                    "id": idO,
                    "username": Oname,
                    "score": scoreO
              }
              $.ajax({
                  url: url1,
                  type: 'PUT',
                  data: dat,
                  success: function(data) {
                    //alertpage('Updated Score O');
                  }
                });
              //console.log(idX,Xname, scoreX);
              var url2 = "http://localhost:65234/api/Users/"+idX;
              dat={
                    "id": idX,
                    "username": Xname,
                    "score": scoreX
              }
              $.ajax({
                  url: url2,
                  type: 'PUT',
                  data: dat,
                  success: function(data) {
                    //alertpage('Updated Score X');
                  }
                });
          }
        // display scores
        function displayo(){
            document.getElementById("o").innerHTML= "Score :" + scoreO;
        }
          function displayx(){
            document.getElementById("x").innerHTML= "Score :" + scoreX;
        }
// jquery
    $(document).ready(function() {
        $(".container-fluid").hide();
        const Urlget = 'http://localhost:65234/api/Users';
        $.get(Urlget, function(data, status){
            console.log(data, status);
            arr =data;
        }); 
        
        $('.tic-box').click(function() { 
             var id = $(this).attr('id');
            var c =document.getElementById(id).innerHTML;
           //console.log(c);
            if(c=='X'|| c=='O'){
                alertpage("Select some other block");
            }
            else{
                count=count+1;
                change();
             document.getElementById(id).innerHTML = i;
               check(id) ;
            }
            //console.log(id);
});
        $('#start').click(function(){
            reset();
            var O = document.getElementById("playero").value;
            var X = document.getElementById("playerx").value;
           
            if(O==""||X=="")
            {
                alertpage("Please enter both the usernames");
            }
            else if(O==X)
                {
                    alertpage("Please select different usernames!!");
                }
        else
        {
             $("#playero").attr("disabled", true);
            $("#playerx").attr("disabled", true);
            $(".container-fluid").show();
           url = "http://localhost:65234/api/Users";
            Oname = O;
            Xname = X;
            console.log(O,X,scoreO);
            var c =0;
            for(var i=0; i<arr.length; i++)
                {
                    if(arr[i].username == O)
                        {  idO= arr[i].id;
                           scoreO= arr[i].score;
                            console.log(O,X,scoreO);    
                            displayo();
                          c=1;  
                        }
                }
                   if(c==0)
                        {
                            dat = {
                                       "username": O,
                                        "score": scoreO
                                    };
                             $.post(url,dat,function(data,status){ idO = data.id; alertpage("Welcome "+ O); });   
                            displayo();
                            $.get(Urlget, function(data, status){
            console.log(data, status);
            arr =data;
        }); 
                        }
            
            c=0;
            for(var i=0;i<arr.length;i++)
                {
                    if(arr[i].username == X)
                        {   idX= arr[i].id;
                           scoreX= arr[i].score;
                        displayx();
                         c=1;  
                        }
                }
            
                    if(c==0){
                         dat = {
                                       "username": X,
                                        "score": scoreX
                                    };
                             $.post(url,dat,function(data,status){ idX = data.id; alertpage("Welcome "+ X); });   
                             displayx();
                        }
        }
                       
                    });
              
            

});      