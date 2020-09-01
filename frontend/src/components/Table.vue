<template>
  <div id="table1">
    <table class="table" style="width:100%; table-layout: fixed;">
      <thead>
        <tr>
          <th>When</th>
          <th>Peak Flow (L/min)</th>
          <th>Medication</th>
          <th style="width:55%">Comment</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Mon, 31 Aug 2020, 07:42</td>
          <td>600</td>
          <td>Pre-Med</td>
          <td
            class="comment"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
        </tr>

        <tr>
          <td>Tue, 1 Sep 2020, 08:46</td>
          <td>620</td>
          <td>Post-Med</td>
          <td
            class="comment"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
        </tr>

        <tr>
          <td>Wed, 2 Sep 2020, 08:22</td>
          <td>612</td>
          <td>Post-Med</td>
          <td
            class="comment"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
        </tr>

        <tr>
          <td>Thu, 3 Sep 2020, 08:34</td>
          <td>630</td>
          <td>Post-Med</td>
          <td class="comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
        </tr>

        <tr>
          <td>Fri, 4 Sep 2020, 08:24</td>
          <td>680</td>
          <td>None</td>
          <td
            class="comment"
          >Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
        </tr>

        <tr>
          <td>Sat, 5 Sep 2020, 08:21</td>
          <td>520</td>
          <td>Pre-Med</td>
          <td
            class="comment"
          >Vivamus at orci et turpis vestibulum luctus at eu magna. Curabitur volutpat gravida suscipit. Morbi tincidunt sollicitudin pellentesque. Cras sagittis id sapien sed ornare. Ut aliquet, arcu vel viverra finibus, lectus augue convallis quam, at finibus justo orci ac metus. Duis iaculis elit id ipsum scelerisque, sed bibendum nisl placerat.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
thead {
  font-size: 14px;
  color: #363636;
}

tbody {
  font-size: 14px;
  color: #363636;
}

th {
  margin: 0px 10px;
}

td {
  margin: 0px 10px;
  vertical-align: middle;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.comment {
  text-align: justify;
}
</style>