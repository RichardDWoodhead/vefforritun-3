/*
author: hji.
about (link)
*/

//constructor.
function mtrig(){}


///////////////////////////////////////////////////////////////////
//Part 1. Conversion.
//var radians=mtrig.prototype.degrees_to_radians(degrees);
mtrig.prototype.degrees_to_radians=function(degrees){
    return((degrees*Math.PI)/180);
    }
//var degrees=mtrig.prototype.radians_to_degrees(radians);
mtrig.prototype.radians_to_degrees=function(radians){
    return((radians*180)/Math.PI);
    }
//you send in degrees and get back the cos.
mtrig.prototype.degrees_to_cos=function(degrees){
    var degrees=parseInt(degrees);
    var degrees=(degrees-90);//my chosen north/0d is straight up.
    var degrees=(degrees%360);//to allow multiple circles.

    var rad=mtrig.prototype.degrees_to_radians(degrees);

    var cos=Math.cos(rad);
    var cos=cos.toFixed(2);
    return cos;
    }
//var cosine=Math.cos(degrees/180*Math.PI);
//you send in degrees and get back the sin.
mtrig.prototype.degrees_to_sin=function(degrees){
    var degrees=parseInt(degrees);
    var degrees=(degrees+90);//my chosen north/0d is straight up.
    //var degrees=(degrees%360);//to allow multiple circles.

    var rad=mtrig.prototype.degrees_to_radians(degrees);
    var sin=Math.sin(rad);
    var sin=sin.toFixed(2);

    return sin;
    }
//var report_string='degrees: '+degrees+', rad: '+rad+', sin: '+sin; alert(report_string);
//var sine=Math.sin(degrees/180*Math.PI);

////send in an angle in degrees and get back its sin.
////var sin=mtrig.prototype.degrees_to_sin(degrees);
//mtrig.prototype.degrees_to_sin=function(degrees){
//    var rad=mtrig.prototype.degrees_to_radians(degrees);
//    var sin=Math.sin(rad);
//    return sin;
//    }
////send in an angle in degrees and get back its cos.
////var cos=mtrig.prototype.degrees_to_cos(degrees);
//mtrig.prototype.degrees_to_cos=function(degrees){
//    var rad=mtrig.prototype.degrees_to_radians(degrees);
//    var cos=Math.cos(rad);
//    return cos;
//    }



///////////////////////////////////////////////////////////////////
//Part 2. Travels.
//runs pythagorean theorem on input, using input as side a and b.
mtrig.prototype.straight_distance=function(x,y){
    return Math.pow((x*x)+(y*y),0.5);
    }
mtrig.prototype.between_points_degrees=function(x1,y1, x2,y2){
    var delta_x=(x2-x1);
    var delta_y=(y2-y1);

    var angle=Math.atan2(delta_y,delta_x)*180/Math.PI;

    //fix the four quarters somehow:
    if(delta_x>=0 && delta_y>=0) {angle=(90-angle);}  //q1, upright.
    if(delta_x>=0 && delta_y<0)  {angle=Math.abs(angle);angle=(angle+90);}  //q2, downright.
    if(delta_x<0 && delta_y<=0)  {angle=Math.abs(angle);angle=(angle+90);}  //q3, downleft.
    if(delta_x<0 && delta_y>0)   {angle=(angle-90); angle=(360-angle);}  //q4, upleft.

    var angle=angle.toFixed(2);
    return angle;
    }
//you send in two points and get back the inclination of the line between them.
mtrig.prototype.between_points_ypx=function(x1,y1, x2,y2){
    dx=(x2-x1);
    dy=(y2-y1);
    //no zeros, they may result in string 'infinity'.
    if(dx==0)  {dx=0.0001;}
    if(dy==0)  {dy=0.0001;}

    //set a limit to the sizes the numbers can have.
    //if i don't do this here, y_steps_per_x may turn into string 'infinity' and thats illogical.
    var periphery=10000;
    var dx=mtrig.prototype.enforce_periphery({'periphery_lower':-periphery, 'periphery_higher':periphery, 'number':dx});
    var dy=mtrig.prototype.enforce_periphery({'periphery_lower':-periphery, 'periphery_higher':periphery, 'number':dy});

    //get y_per_x, make sure it is within periphery and has correct extra digit quantity.
    y_steps_per_x=(dy/dx);
    var y_steps_per_x=mtrig.prototype.enforce_periphery({'periphery_lower':-periphery, 'periphery_higher':periphery, 'number':y_steps_per_x});
    var y_steps_per_x=y_steps_per_x.toFixed(2);

    return y_steps_per_x;
    }
//gives you back the straight distance between the two points sent in.
mtrig.prototype.between_points_distance=function(x1,y1, x2,y2){
    dx=(x2-x1);
    dy=(y2-y1);

    var side_squared_x=Math.pow(dx,2);
    var side_squared_y=Math.pow(dy,2);
    var sides_total=(side_squared_x+side_squared_y);
    var straight_distance=Math.pow(sides_total,0.5);

    var straight_distance=straight_distance.toFixed(2);
    //make sure we return a number.
    var straight_distance=parseInt(straight_distance);
    return straight_distance;
    }
// makes sure that a number sent in is not lower than a certain value and also not higher than a certain value.
// if it is outside allowed it simply becomes the closes allowed number.
//var dx=enforce_range({'lowest_allowed':-margin, 'highest_allowed':margin, 'number':dx});
// this function should be moved to some other module later.
mtrig.prototype.enforce_periphery=function(args){
    var periphery_lower=args.periphery_lower;
    var periphery_higher=args.periphery_higher;
    var number=args.number;

    if(number>periphery_higher)  {number=periphery_higher;}
    if(number<periphery_lower)   {number=periphery_lower;}

    return number;
    }


mtrig.prototype.line_dx=function(args){
    var distance=args.distance;
    var angle=args.angle;

    var cos=mtrig.prototype.degrees_to_cos(angle);
    var dx=(distance*cos);
    var dx=dx.toFixed(2);
    return dx;
    }
mtrig.prototype.line_dy=function(args){
    var distance=args.distance;
    var angle=args.angle;

    var sin=mtrig.prototype.degrees_to_sin(angle);
    var dy=(distance*sin);
    var dy=dy.toFixed(2);
    return dy;
    }
//[x,y]=mtrig.prototype.point_after_line_from_point({'x':0,'y':0, 'angle':90,'distance':10});
mtrig.prototype.point_after_line_from_point=function(args){
    //print_to_alert(args);
    var x=args.x;
    var y=args.y;
    var angle=args.angle;
    var distance=args.distance;

    var cos=mtrig.prototype.degrees_to_cos(angle);
    var sin=mtrig.prototype.degrees_to_sin(angle);

    //get the distances traveled.
    var travel_x=(distance*cos);
    var travel_y=(distance*sin);
    //derive the new location.
    var x_after=(x+travel_x);
    var y_after=(y+travel_y);

    return([x_after,y_after]);
    }
//if there is no crossing point then it returns just an empty array.
// example: ccrossing_point=itrig.get_crossing_point_of_lines(5,5,10,10, 10,10,5,5);
mtrig.prototype.get_crossing_point_of_lines=function(ax1,ay1,ax2,ay2,  bx1,by1,bx2,by2){
    //-both lines must coexist at some point in each dimension, otherwise theres no need to check.
    //..

    //-make sure there are no straight lines.
    if(ax1==ax2){ax2++;}    if(bx1==bx2){bx2+=0.0001;}
    if(ay1==ay2){ay2++;}    if(by1==by2){by2+=0.0001;}

    //-derive lower/higher values.
    var ax_lower_value=Math.min(ax1,ax2);  var ax_higher_value=Math.max(ax1,ax2);
    var ay_lower_value=Math.min(ay1,ay2);  var ay_higher_value=Math.max(ay1,ay2);
    var bx_lower_value=Math.min(bx1,bx2);  var bx_higher_value=Math.max(bx1,bx2);
    var by_lower_value=Math.min(by1,by2);  var by_higher_value=Math.max(by1,by2);

    //-find ranges where both lines are existing, for one dimension at a time.
    if(ax_lower_value>bx_lower_value)  {both_existing_x_from=ax_lower_value; } else{both_existing_x_from=bx_lower_value;}//both_existing_at_x_from.
    if(ax_higher_value<bx_higher_value){both_existing_x_to  =ax_higher_value;} else{both_existing_x_to=bx_higher_value; }//both_existing_at_x_to.
    if(ay_lower_value>by_lower_value)  {both_existing_y_from=ay_lower_value; } else{both_existing_y_from=by_lower_value;}//both_existing_at_y_from.
    if(ay_higher_value<by_higher_value){both_existing_y_to  =ay_higher_value;} else{both_existing_y_to=by_higher_value; }//both_existing_at_y_to.

    //-if a dimension has no both_existing range.. there cannot be a collision.
    if(both_existing_x_from>both_existing_x_to) {return [];}
    if(both_existing_y_from>both_existing_y_to) {return [];}

    //derive y_steps_per_x.
    a_ys_per_x=mtrig.prototype.between_points_ypx(ax1,ay1, ax2,ay2);
    b_ys_per_x=mtrig.prototype.between_points_ypx(bx1,by1, bx2,by2);

    //find the y difference between a and b at x=0.
    a_y_difference=-(ax1*a_ys_per_x);    a_y_at_x_zero=(ay1+a_y_difference);
    b_y_difference=-(bx1*b_ys_per_x);    b_y_at_x_zero=(by1+b_y_difference);
    y_difference_at_x_zero=(a_y_at_x_zero-b_y_at_x_zero);
    //find the inclination difference between them.
    inclination_difference=-(a_ys_per_x-b_ys_per_x);
    //deduce where cp_x is.
    cp_x=(y_difference_at_x_zero/inclination_difference);
    //deduce cp_y at cp_x.
    cp_y=(a_y_at_x_zero+(cp_x*a_ys_per_x));

    //remove extra digits.
    var cp_x=cp_x.toFixed(2);
    var cp_y=cp_y.toFixed(2);

    //i return the crossing point.. if there is one.
    var to_return=[cp_x,cp_y];
    //-Crossing point must be where both lines are existing, in both dimensions (the one is for error margin).
    if((cp_x>both_existing_x_from-1 && cp_x<both_existing_x_to+1) && (cp_y>both_existing_y_from-1 && cp_y<both_existing_y_to+1)) {}
    else{to_return=[];}

    return to_return;
    }
//else{cp_x="none"; cp_y="none";}
//return [cp_x, cp_y];

//you send in two points and get back a point on the line between them.
//range then represents how far from a to b you want.
//range 50 for instance would give back the point right between the two points.
//range 10 would give the point 10% on the way from a to b.
//range can only be a number between 0 and 100.
mtrig.prototype.point_between_points=function(args){
    var point_a=args.point_a;
    var point_b=args.point_b;
    var range=args.range;//where between the two points i want to get.

    if(range>100){alert("range should not be more than a hundred.");}
    if(range<0)  {alert("range should not be less than zero.");}

    var range=(range/100);

    //this is really just the same problem.. twice. Once for each dimension.
    //for x:
    var xa=point_a[0];
    var xb=point_b[0];
    var xd=(xb-xa);
    var xd=(xd*range);
    var x_final=(xa+xd)
    //for y:
    var ya=point_a[1];
    var yb=point_b[1];
    var yd=(yb-ya);
    var yd=(yd*range);
    var y_final=(ya+yd)

    return [x_final,y_final];
    }


///////////////////////////////////////////////////////////////////
//Part 3. Polygons.
// a polygon is just a collection of points, and sometimes the angle and distance between them.
// sample polygon:
// x,y,angle,distance.
// pg[0]=[300,400,90,0];
// pg[1]=[400,400,90,180];

// points and connections can both correct the other one. so you can change one and the other one just follows.
// if you change a point, you must re-derive connections around it.
// if you change a connection, you must re-derive all points after it.

// with this setup you can change points and connections at will.
// rotation=change first connections angle.
// scale=change connection distance.
// movement=change points.

// remakes connections, assuming points are always correct.
mtrig.prototype.update_connections_by_points=function(polygon){
    //travel through points.
    var point_quantity=(polygon.length-1);
    for(var cline=0;cline<=point_quantity;cline++){
        var nline=(cline+1);
        // the last point goes straight to the first point.
        if(cline==point_quantity)  {nline=0;}

        // get current point.
        var cpx=polygon[cline][0];
        var cpy=polygon[cline][1];
        // get next point.
        var npx=polygon[nline][0];
        var npy=polygon[nline][1];
        // derive angle between them.
        var degrees=mtrig.prototype.between_points_degrees(cpx,cpy, npx,npy);
        // derive distance between them.
        var distance=mtrig.prototype.between_points_distance(cpx,cpy, npx,npy);
        // add this information to polygon.
        polygon[cline][2]=degrees;
        polygon[cline][3]=distance;
        }
    return polygon;
    }
//remakes points, assuming the first point and all connections are correct.
//current point+its connection=next point.
mtrig.prototype.update_points_by_connections=function(polygon){
    //travel through all points but last.
    var point_quantity=polygon.length;
    for(var cline=0;cline<point_quantity-1;cline+=1){
        var nline=(cline+1);
        // get current point.
        var cpx=polygon[cline][0];//x
        var cpy=polygon[cline][1];//y
        var cpa=polygon[cline][2];//angle
        var cpd=polygon[cline][3];//distance

        // next point is current point plus angle-distance.
        //[npx,npy]=mtrig.prototype.point_after_line_from_point({'x':cpx,'y':cpy, 'angle':cpa,'distance':cpd});
        new_point=mtrig.prototype.point_after_line_from_point({'x':cpx,'y':cpy, 'angle':cpa,'distance':cpd});
        // add this information to polygon.
        polygon[nline][0]=new_point[0];
        polygon[nline][1]=new_point[1];
        //alert('before: '+polygon[cline]+"\n"+'after: '+polygon[nline]);
        }
    return polygon;
    }






//then when with repeat i must delete pgp_d.
//a polygon does not, nor should, have a unique id.
//therefore its not possible to map a polygon to its rectangles.
//instead im gona log all rectangles ive made for debug.. and empty them on each iteration.
//this function is also capable of running in 'repeat'.
//before running this function make sure to run:
//display_raphael=new Array();
mtrig.prototype.display_polygon_points=function(polygon){
    var y_center=400;
    var point_quantity=polygon.length;
    var dbase=display_points_raphael.length;

    for(var cline=0;cline<=point_quantity-1;cline+=1){
        //raphael uses y coordinate growin from top, therefore we must flip y before talking to it.
        var y1=mtrig.prototype.flip({'number':polygon[cline][1], 'around':y_center});
        var pd=6;//pd=point diameter.

        //the dline is the line in the global display array.
        var dline=(dbase+cline);
        //the two debug colors are: 007700 and 55bb33.
        //var cr=drawing_board_raphael.rect(polygon[cline][0]-pd/2,y1-pd/2,pd,pd,0).attr({'fill':'rgb(0,0,0)'});
        var cr=drawing_board_raphael.rect(polygon[cline][0]-pd/2,y1-pd/2,pd,pd,0).attr({'fill':'000000', 'stroke':'#000000'});
        display_points_raphael[dline]=cr;
        }
    }
//var cr=display_points_raphael[dline];
//print_to_alert(temp); //alert(temp);
//polygon[cline].attr({x:30});
//pgp_d[cline]=drawing_board_raphael.rect(polygon[cline][0]-pd/2,y1-pd/2,pd,pd,0).attr({'fill':'rgb(0,0,0)'});
//uses polygon points to draw the connections.
mtrig.prototype.display_polygon_connections=function(polygon){
    var y_center=400;
    var point_quantity=polygon.length;
    var dbase=display_connections_raphael.length;

    for(var cline=0;cline<=point_quantity-1;cline+=1){
        var nline=(cline+1);
        if(nline==point_quantity)  {nline=0;}//because its circular.
        //x,y from to and delta.
        var x1=polygon[cline][0];
        //raphael uses y coordinate growin from top, therefore we must flip y before talking to it.
        var y1=mtrig.prototype.flip({'number':polygon[cline][1], 'around':y_center});
        var x2=(polygon[nline][0]);
        var y2=mtrig.prototype.flip({'number':polygon[nline][1], 'around':y_center});
        var x_delta=(x2-x1);
        var y_delta=(y2-y1);

        var line_string='M'+x1+' '+y1+' l'+x_delta+' '+y_delta;

        //the dline is the line in the global display array.
        var dline=(dbase+cline);
        var cc=display_connections_raphael[dline];

        //if current connection is defined.. remove it.
        if(typeof cc !== 'undefined')  {cc.remove();}

        cc=drawing_board_raphael.path(line_string);
        cc.attr("stroke-width", 5);
        //cc.attr("stroke", "#ffff00");
        cc.attr("stroke", "#007700");
        display_connections_raphael[dline]=cc;
        }
    }
//i have a collection of raphael objects that i am displaying.
//in order to have the objects move i have to make them disappear and recreate them.
//here we make them disappear.
mtrig.prototype.remove_display_objects=function(){
    //display_points_raphael=[];
    for(var cline=0;cline<=display_points_raphael.length;cline+=1){
        var cobject=display_points_raphael[cline];
        //if current point is defined.. remove it.
        if(typeof cobject !== 'undefined')  {cobject.remove();}
        }
    for(var cline=0;cline<=display_connections_raphael.length;cline+=1){
        var cobject=display_connections_raphael[cline];
        //if current point is defined.. remove it.
        if(typeof cobject !== 'undefined')  {cobject.remove();}
        }
    }
//displays both the points and the connections.
//in order to display a polygon, run the following in your 'repeat':
//mtrig.prototype.remove_display_objects();
//mtrig.prototype.display_polygon(pg);
mtrig.prototype.display_polygon=function(polygon){
    mtrig.prototype.display_polygon_connections(polygon);
    mtrig.prototype.display_polygon_points(polygon);
    }



//in polygon points, each point is connected to two and only two other points.
//need to run 'update_connectsion_by_points' forwards and backwards.
mtrig.prototype.is_point_within_polygon=function(args){
    var point=args.point;
    var polygon=args.polygon;

    //if point sent in is not a number.. then its not within the polygon.
    if(typeof point[0]!=='number')  {return 0;}
    if(typeof point[1]!=='number')  {return 0;}

    //use an imaginary line from the point to some place really far away.
    var outside_point=[10000,point[1]];//if i dont make a straight line the i can get incorrect results.
    //here i have a line between my point and this outside point.

    var point_quantity=polygon.length;
    var intersections=new Array();
    var cintersection=0;

    //check each line of the polygon if it intersects that line.
    for(var cline=0;cline<=point_quantity-1;cline+=1){
        var nline=(cline+1);
        if(nline==point_quantity)  {nline=0;}//because its circular.

        //if so add it to intersections.
        var cp=new Array();
        //[cp_x,cp_y]=mtrig.prototype.get_crossing_point_of_lines(point[0],point[1],outside_point[0],outside_point[1],  polygon[cline][0],polygon[cline][1],polygon[nline][0],polygon[nline][1]);
        cp=mtrig.prototype.get_crossing_point_of_lines(point[0],point[1],outside_point[0],outside_point[1],  polygon[cline][0],polygon[cline][1],polygon[nline][0],polygon[nline][1]);
        var cpx=cp[0]; var cpy=cp[1];
        if(cpx){
            intersections[cintersection]=[cpx,cpy];
            cintersection+=1;
            //for debugging purposes:
            //var string_line_a='line_a:'+point[0]+','+point[1]+' to '+outside_point[0]+','+outside_point[1]+"\n";
            //var string_line_b='line_b:'+polygon[cline][0]+','+polygon[cline][1]+' to '+polygon[nline][0]+','+polygon[nline][1]+"\n";
            //var string_cp='cp:'+cp_x+','+cp_y+"\n";
            //var string_total=(string_line_a+string_line_b+string_cp);
            //alert(string_total);
            }
        delete cpx;
        delete cpy;
        }
    var intersection_quantity=intersections.length;

    var is_within=0;
    //if intersection quantity is an even number, the point is outside.
    if(intersection_quantity%2==1) {is_within=1;}
    //if intersection quantity is an odd number, inside.
    if(intersection_quantity%2==0) {is_within=0;}
    return is_within;
    }

// i send in two line sets.. and get back where they cross.
mtrig.prototype.polygon_crossing_points=function(args){
    var pg_a=args.polygon_a;
    var pg_b=args.polygon_b;
    var point_quantity_a=(pg_a.length);
    var point_quantity_b=(pg_b.length);
    var crossing_points=[];
    var cpoint=0;

    for(var af_line=0;af_line<point_quantity_a;af_line++){
        var at_line=(af_line+1);
        // the last point goes straight to the first point.
        if(at_line>=point_quantity_a)  {at_line=0;}

        //iterate through b..
        for(var bf_line=0;bf_line<point_quantity_b;bf_line++){
            var bt_line=(bf_line+1);
            // the last point goes straight to the first point.
            if(bt_line>=point_quantity_b)  {bt_line=0;}

            //now i get the crossing point.
            ccrossing_point=mtrig.prototype.get_crossing_point_of_lines(
                pg_a[af_line][0],pg_a[af_line][1],  pg_a[at_line][0],pg_a[at_line][1],
                pg_b[bf_line][0],pg_b[bf_line][1],  pg_b[bt_line][0],pg_b[bt_line][1]
                );
            //if there is a crossing point.. add it to 'crossing_points'.
            if(ccrossing_point.length>0){
                var x=ccrossing_point[0];
                var y=ccrossing_point[1];
                var x=Number(x);
                var y=Number(y);
                crossing_points[cpoint]=[x,y];
                cpoint+=1;
                }
            }
        }
    return crossing_points;
    }




//i think this is a complete polygon collision detection.
//the difference between this function and just detection if any of the lines collide is that
//this function also detects if one polygon is completely within another.
mtrig.prototype.do_polygons_collide=function(args){
    var pg_a=args.polygon_a;
    var pg_b=args.polygon_b;
    var are_colliding=0;
    //get collision points between the two polygons.
    var crossing_points=mtrig.prototype.polygon_crossing_points({'polygon_a':pg_a, 'polygon_b':pg_b});

    //if there are crossing points.. the polygons defininitely are colliding.
    if(crossing_points.length>0){
        are_colliding=1;
        }
    //if there are no crossing points..
    if(crossing_points.length==0){
        //the polygons are either completely apart or completely within.
        //so all the polygon points are the same.. either inside or outside the other.
        //and also, if a is inside then the b must be outside.
        //so i just need to check a single point in either polygon, for if its within or outside the other,
        //and i can deduce if one is within the other from that.
        var is_within_a=mtrig.prototype.is_point_within_polygon({'point':pg_a[0], 'polygon':pg_b});
        var is_within_b=mtrig.prototype.is_point_within_polygon({'point':pg_b[0], 'polygon':pg_a});
        //no crossing point, yet one is within the other.
        if(is_within_a==0 && is_within_b==0){
            //alert("neither is within the other");
            are_colliding=0;
            }
        //if either is within the other.. they are colliding.
        if(is_within_a==1 || is_within_b==1){
            //alert("one is within the other");
            are_colliding=1;
            }
        }
    return are_colliding;
    }

//warning, this function does appear to be somewhat inaccurate as the resulting point quantity
//tends to be a bit smaller than it should.
//if speed becomes a problem, can note the border and check only from it for changes, even recursively.
mtrig.prototype.polygon_area=function(polygon){
    var point_quantity=polygon.length;

    //-find lowest/highest x/y.
    var x_lowest=polygon[0][0];
    var x_highest=polygon[0][0];
    var y_lowest=polygon[0][1];
    var y_highest=polygon[0][1];
    for(var cline=0;cline<point_quantity;cline+=1){
        if(polygon[cline][0]<x_lowest)  {x_lowest=polygon[cline][0];}
        if(polygon[cline][0]>x_highest) {x_highest=polygon[cline][0];}
        if(polygon[cline][1]<y_lowest)  {y_lowest=polygon[cline][1];}
        if(polygon[cline][1]>y_highest) {y_highest=polygon[cline][1];}
        }

    //iterate from lowest to highest x and y, and check point concerned for being within polygon.
    var within_quantity=0;
    for(var cx=x_lowest;cx<=x_highest;cx++){
        for(var cy=y_lowest;cy<=y_highest;cy++){
            //var xy_string='x:'+cx+', y:'+cy;
            var is_within=mtrig.prototype.is_point_within_polygon({'point':[cx,cy] ,'polygon':polygon})
            if(is_within==1)  {within_quantity++;}
            }
        }
    //now you have total area.
    return within_quantity;
    }

//slice_pg=mtrig.prototype.place_polygon({"polygon":slice_pg, "x":11, "y":422});
mtrig.prototype.place_polygon=function(args){
    var x=args.x;
    var y=args.y;
    var pg=args.polygon;

    pg=mtrig.prototype.make_polygon_relative(pg);
    //add x and y to every point.
    pg=mtrig.prototype.move_polygon({"polygon":pg, "x":x, "y":y});
    return pg;
    }
//slice_pg=mtrig.prototype.move_polygon({"polygon":slice_pg, "x":1, "y":-1});
mtrig.prototype.move_polygon=function(args){
    var x=args.x;
    var y=args.y;
    var polygon=args.polygon;

    var polygon_size=polygon.length;
    for(var cline=0;cline<polygon_size;cline++){
        polygon[cline][0]+=x;
        polygon[cline][1]+=y;
        }
    return polygon;
    }
mtrig.prototype.make_polygon_relative=function(polygon){
    //we take the x and y of the first point.
    var x=polygon[0][0];
    var y=polygon[0][1];
    //and all point thereafter become relative to that.
    var polygon_size=polygon.length;
    for(var cline=0;cline<polygon_size;cline++){
        polygon[cline][0]-=x;
        polygon[cline][1]-=y;
        }
    return polygon;
    }

//this is an api function.
//send in a raphael rectangle and you get back its points.
//currently it only works for raphael rectangles.
//you send in a raphael rectangle, and get back its four corners.
//the rectangle must not be rotated, and have just been created by raphael.
//you can rotate the rectangle after getting the border points.
//probably gets confused when dealing with sliced images.
mtrig.prototype.raphael_borders=function(raphael_element){
    var x=raphael_element.attr('x');
    var y=raphael_element.attr('y');
    var width=raphael_element.attr('width');
    var height=raphael_element.attr('height');

    var screen_center=400;
    var y=mtrig.prototype.flip({'number':y, 'around':screen_center});
    y-=100;

    var polygon=new Array();
    polygon[0]=[x,y+height];
    polygon[1]=[x+width,y+height];
    polygon[2]=[x+width,y];
    polygon[3]=[x,y];

    return polygon;
    }








// this should be elsewhere.
// flips a number in a single dimension around another.
// 200 flipped around 600 for instance, will become 1000.
// because thats where the number is the equal distance in the opposite direction, its mirroring.
//var flipped=mtrig.prototype.flip({'number':-200, 'around':0});
mtrig.prototype.flip=function(args){
    var number=args.number;
    var around=args.around;

    var distance=(around-number);
    var to_move=(2*distance);
    var flipped_number=(number+to_move);
    return flipped_number;
    }








//GARBAGE:

////then when with repeat i must delete pgd.
//mtrig.prototype.display_polygon_points=function(pg){
//    //i have to flip before talking to raphael.
//    var y1=mtrig.prototype.flip({'number':pg[0][1], 'around':400});
//    var y2=mtrig.prototype.flip({'number':pg[1][1], 'around':400});
//    var y3=mtrig.prototype.flip({'number':pg[2][1], 'around':400});
//    var y4=mtrig.prototype.flip({'number':pg[3][1], 'around':400});
//
//    //and now talk to raphael.
//    var s=6;//s is the diameter of the points.
//    var pgd=new Array();
//    pgd[0]=drawing_board_raphael.rect(pg[0][0]-s/2,y1-s/2,s,s,0).attr({'fill':'rgb(0,0,0)'});
//    pgd[1]=drawing_board_raphael.rect(pg[1][0]-s/2,y2-s/2,s,s,0).attr({'fill':'rgb(0,0,0)'});
//    pgd[2]=drawing_board_raphael.rect(pg[2][0]-s/2,y3-s/2,s,s,0).attr({'fill':'rgb(0,0,0)'});
//    pgd[3]=drawing_board_raphael.rect(pg[3][0]-s/2,y4-s/2,s,s,0).attr({'fill':'rgb(0,0,0)'});
//    }

//you send in two points and get back the angle between them, in degrees.
//mtrig.prototype.between_points_degrees=function(x1,y1, x2,y2){
//    //because screens have the y resolution upside down.
//    y1=-y1; y2=-y2;
//
//    var delta_x=(x2-x1); var delta_y=(y2-y1);
//    var distance=mtrig.prototype.straight_distance(delta_x,delta_y);
//    var degrees_per_rad=(180/Math.PI);
//
//    //sin=adjacent/long.
//    var opposite_over_long=(delta_y/distance);
//    var angle=Math.asin(opposite_over_long);
//    angle*=degrees_per_rad;
//
//    //fix the four quarters somehow:
//    if(delta_x>0 && delta_y<0)  {}                                      //downright.
//    if(delta_x<0 && delta_y<0)  {angle+=90;  angle=-angle; angle-=90;}  //downleft.
//    if(delta_x<0 && delta_y>0)  {angle+=180; angle=-angle;}             //upleft.
//    if(delta_x>0 && delta_y>0)  {angle+=270; angle=-angle; angle+=90; var temp=(angle+270); angle-=(temp*2);}  //upright.
//    angle=-angle;
//
//    //and then i take the straight lines, they are always easy.
//    if(delta_x>0  && delta_y==0) {angle=0;}
//    if(delta_x==0 && delta_y>0)  {angle=90;}
//    if(delta_x<0  && delta_y==0) {angle=180;}
//    if(delta_x==0 && delta_y>0)  {angle=270;}
//
//    var angle=angle.toFixed(2);
//    return angle;
//    }



