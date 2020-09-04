<template>
  <div class="modal is-active">
    <div class="modal-background" v-on:click="closeModal()"></div>
    <div class="modal-content">
      <div
        style="width:90%; max-width:600px; background:white; margin:auto auto; padding: 30px 30px; text-align:left;"
      >
        <h4 class="subtitle is-4">Add New Entry</h4>

        <br />

        <div class="field">
          <label class="label" style="font-size:14px;">When</label>

          <div class="control">
            <flat-pickr
              v-model="date"
              :config="config"
              placeholder="Select date"
              name="date"
            >
            </flat-pickr>
          </div>
        </div>

        <div style="height:10px;" />

        <div class="field">
          <label class="label" style="font-size:14px;">Peak Flow (L/min)</label>
          <div class="control">
            <input
              style="font-size:14px;"
              class="input"
              type="number"
              v-model="peakFlow"
            />
          </div>
        </div>

        <div style="height:10px;" />

        <div class="field">
          <label class="label" style="font-size:14px; width:100%;"
            >Medication</label
          >
          <div class="control">
            <div class="select" style="font-size:14px; width:100%;">
              <select style="font-size:14px; width:100%;" v-model="medication">
                <option>None</option>
                <option>Pre-Med</option>
                <option>Post-Med</option>
              </select>
            </div>
          </div>
        </div>

        <div style="height:10px;" />

        <div class="field">
          <label class="label" style="font-size:14px;">Comment</label>
          <div class="control">
            <textarea
              class="textarea"
              style="font-size:14px;"
              v-model="comment"
            ></textarea>
          </div>
        </div>

        <br />

        <button class="button is-primary" v-on:click="addNewEntry()">
          Add
        </button>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      v-on:click="closeModal()"
    ></button>
  </div>
</template>

<script>
import { EventBus } from "@/event_bus/event_bus.js";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "DashboardModal",

  components: {
    flatPickr,
  },

  methods: {
    closeModal() {
      EventBus.$emit("close-dashboard-modal");
    },

    addNewEntry() {
      let date = Date.parse(this.date);

      this.$store.commit("addNewEntry", {
        date: date,
        peakFlow: this.peakFlow,
        medication: this.medication,
        comment: this.comment,
      });

      this.closeModal();
    },
  },

  mounted() {},

  data: function() {
    return {
      date: new Date(),
      peakFlow: "",
      medication: "",
      comment: "",

      config: {
        wrap: false, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y H:i",
        altInput: true,
        enableTime: true,
        defaultDate: new Date(),
        time_24hr: true,
      },
    };
  },
};
</script>
