
<template>
  <div class="modal" v-bind:class="{ 'is-active' : showModal }">
    <div class="modal-background" v-on:click="showModal = false"></div>
    <div class="modal-content">
      <div
        style="width:80%; max-width:600px; background:white; margin:auto auto; padding: 20px; text-align:left;"
      >
        <h4 class="subtitle is-4">Add New Reading</h4>

        <br />

        <div class="field">
          <label class="label" style="font-size:14px;">When</label>
          <div class="control">
            <input style="font-size:14px;" class="input" type="text" />
          </div>
        </div>

        <div style="height:10px;" />

        <div class="field">
          <label class="label" style="font-size:14px;">Peak Flow (L/min)</label>
          <div class="control">
            <input style="font-size:14px;" class="input" type="number" />
          </div>
        </div>

        <div style="height:10px;" />

        <div class="field">
          <label class="label" style="font-size:14px; width:100%;">Medication</label>
          <div class="control">
            <div class="select" style="font-size:14px; width:100%;">
              <select style="font-size:14px; width:100%;">
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
            <textarea class="textarea" style="font-size:14px;"></textarea>
          </div>
        </div>

        <br />

        <button class="button is-primary">Add</button>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" v-on:click="showModal = false"></button>
  </div>
</template>