<template>
  <div class="container">
    <b-menu>
      <b-menu-list label="Menu">
        <b-menu-item v-for="(values, key, index) in nodes" :key="index" :label="key">
          <b-menu-item v-for="(submenus, key, index) of values" :key="index" :expanded="true">
            <template slot="label" slot-scope="props">
              {{(key === 'undefined') ? " " : key}}
              <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
            </template>
            <b-menu-item v-for="(records, key, index) in submenus" :key="index">
              <template slot="label">
                <b-field grouped>
                  <div class="control">
                     <b-taglist v-if="records['Link Type']" attached>
                      <b-tag>Link Type</b-tag>
                      <b-tag
                        class="is-info is-light"
                        rounded
                      >{{records['Link Type']}}</b-tag>
                    </b-taglist>
                  </div>
                  <div class="control">
                    <b-taglist v-if="records['Live']" attached>
                      <b-tag>Live</b-tag>
                      <b-tag
                        class="[records['Live']] ? is-success : ''] is-light"
                        rounded
                      >{{records['Live'] ? "Yes" : "No"}}</b-tag>
                    </b-taglist>
                  </div>
                  <b-field>
                    <span class="icon">
                      <a :href="records['URL']" style="display: inline; padding: 0px;">
                        <i class="mdi mdi-open-in-new is-link is-light"></i>
                      </a>
                    </span>
                  </b-field>
                </b-field>
              </template>
            </b-menu-item>
          </b-menu-item>
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>
<script>
var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyFpPLYYnyZz5vXL"
});
const base = Airtable.base("appdqzfZoeTcXC7VD");

export default {
  name: "dev-menu",
  data() {
    return {
      isActive: true,
      nodes: null
    };
  },
  mounted() {
    base("Config")
      .select({
        // Selecting the first 3 records in MENU - Homework:
        view: "MENU - Homework",
        fields: ["Workflow Phase", "MainMenu", "Sub-menu", "Link Type", "Live", "URL"],
        filterByFormula: 'Live = 1'
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          let items = {};
          var vm = this;
          records.forEach(record => {
            let fields = record.fields;

            //checks if menu is already in the base array, if not create it
            //then create record sub-menu and push record data
            if (items[fields["MainMenu"]]) {
              if (items[fields["MainMenu"]][fields["Sub-menu"]]) {
                items[fields["MainMenu"]][fields["Sub-menu"]].push(fields);
              } else {
                items[fields["MainMenu"]][fields["Sub-menu"]] = [];

                items[fields["MainMenu"]][fields["Sub-menu"]].push(fields);
              }
            } else {
              items[fields["MainMenu"]] = {};
              if ([fields["Sub-menu"]]) {
                items[fields["MainMenu"]][fields["Sub-menu"]] = [];
                items[fields["MainMenu"]][fields["Sub-menu"]].push(fields);
              } else {
                items[fields["MainMenu"]]["submenu"] = [];
                items[fields["MainMenu"]]["submenu"].push(fields);
              }
            }
          });

          fetchNextPage();
          vm.nodes = items;
        }.bind(this),

        err => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }
};
</script>
