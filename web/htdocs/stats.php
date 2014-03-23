<?php
list($page,$ext) = explode('.php', $_SERVER["PHP_SELF"]);
list($script,$meth) = explode('/', $page);

//$page = preg_split('/\.php/', $_SERVER["PHP_SELF"])[0];
//$meth = preg_split('/\//', $page)[1];
if($meth != "index") {
  header("Location: /?mth=$meth");
} else {

$incdir = '../inc';
set_include_path("$incdir"); 
require_once('template.inc.php');
require_once('db.inc.php');


$arr = array();

$db_handle = pg_connect(
  "dbname=$db_name
   host=$db_host
   port=$db_port
   user=$db_ro_user
   password=$db_ro_pass
");


if ($db_handle) {
  $cols = array();

  $col_qry = "select distinct col_id from grid order by col_id";
  $col_rslt = pg_query($db_handle, $col_qry);
  if ($col_rslt) {
    while ($col = pg_fetch_row($col_rslt)) {
      array_push($cols, $col[0]);
    }

    $row_qry = "select max(row_id) as max from grid";
    $row_rslt = pg_query($db_handle, $row_qry);
    if ($row_rslt) {
      while ($row = pg_fetch_row($row_rslt)) {
       $max_rows = $row[0]; 
      }
    } else {
      $arr[] = array("err" => "row_qry failed" . pg_last_error($db_handle));
      echo json_encode($arr);
      echo pg_result_error($rslt);
    }

    # omg. make teh grid!
    print "<table id=\"grid\">";
    print "<tr>";
    print "<td>&nbsp;</td>";

    # column header
    foreach($cols as $col) {
      print "<td class=\"col_id\">$col</td>";
    }

    print "</tr>";

    # rows
    for($i = 1; $i <= $max_rows; $i++) {
      print "<tr>";
      # row header
      print "<td class=\"row_id\">$i</td>";
      # columns
      foreach($cols as $col) {
        #TODO: need to make this such that challenges that aren't open aren't links (eg. they are class 'agrid_space')
        $display_rslt = pg_query_params($db_handle, 
                        "select status,chal_id from grid 
                         where col_id = $1 and row_id = $2",
                        array($col,$i));
        if ($display_rslt) {
          while ($display = pg_fetch_row($display_rslt)) {
            if (! isset($_SESSION['u'])) {
              print "
                <td class=\"agrid_space $display[0]\" 
                    data-chal=\"$display[1]\">&nbsp;</td>
              ";
            } else {
              print "
                <td class=\"grid_space $display[0]\" 
                    data-chal=\"$display[1]\">&nbsp;</td>
              ";
            }
          }
        } else {
          $arr[] = array("err" => "display_qry failed" . pg_last_error($db_handle));
          echo json_encode($arr);
          echo pg_result_error($rslt);
        }
      }
      print "</tr>";
    }
    print "</table>";
  } else {
    $arr[] = array("err" => "col_qry failed" . pg_last_error($db_handle));
    echo json_encode($arr);
    echo pg_result_error($rslt);
  }

  print "<table id=\"score\">";
  print "<tr><th colspan=\"2\">Top Scores</th></tr>";
  $score_qry = "select team_name, score_tally from reg, score where team_id = score_team order by score_tally desc, team_name asc limit 5";
  $score_rslt = pg_query($db_handle, $score_qry);
  if ($score_rslt) {
    while ($score = pg_fetch_row($score_rslt)) {
      print "<tr><td class=\"team_name\">$score[0]</td>
             <td class=\"team_score\">$score[1]</td></tr>";
    }
  } else {
    $arr[] = array("err" => "col_qry failed" . pg_last_error($db_handle));
    echo json_encode($arr);
    echo pg_result_error($rslt);
  }
  print "</table>";

  pg_close($db_handle);

} else {
  $arr[] = array("err" => "db connection failed" . pg_last_error($db_handle));
  echo json_encode($arr);
}

}
?>
