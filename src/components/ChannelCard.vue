<template>
  <div class="channel-card">
    <div class="channel-card-details">
      <div class="channel-card-name">
        <p class="channel-name">AoA</p>
        <img
          src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"
        />
      </div>
      <div class="channel-card-address">
        <img
          @click="copyToClipBoard(textToCopy)"
          src="https://img.icons8.com/material-rounded/20/ffffff/copy.png"
        />
        <p ref="address" style="padding-left: 0.4rem">NQCFGXWCNSTB....</p>
      </div>
    </div>
    <div class="optin">Opt-In</div>
  </div>
  <div class="channel-card">
    <div class="channel-card-details">
      <div class="channel-card-name">
        <p class="channel-name">Angry penguins NFT Series</p>
        <img
          src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"
        />
      </div>
      <div class="channel-card-address">
        <img src="https://img.icons8.com/material-rounded/20/ffffff/copy.png" />
        <p style="padding-left: 0.4rem">NQCFGXWCNSTB....</p>
      </div>
    </div>
    <div class="optin">Opt-In</div>
  </div>
  <div class="channel-card">
    <div class="channel-card-details">
      <div class="channel-card-name">
        <p class="channel-name">Rand Labs</p>
        <img
          src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"
        />
      </div>
      <div class="channel-card-address">
        <img src="https://img.icons8.com/material-rounded/20/ffffff/copy.png" />
        <p style="padding-left: 0.4rem">NQCFGXWCNSTB....</p>
      </div>
    </div>
    <div class="optin">Opt-In</div>
  </div>
  <div class="channel-card">
    <div class="channel-card-details">
      <div class="channel-card-name">
        <p class="channel-name">Rand Labs</p>
        <img
          src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"
        />
      </div>
      <div class="channel-card-address">
        <img src="https://img.icons8.com/material-rounded/20/ffffff/copy.png" />
        <p style="padding-left: 0.4rem">NQCFGXWCNSTB....</p>
      </div>
    </div>
    <div class="optin">Opt-In</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textToCopy: "NQCFGXWCNSTB....",
    };
  },
  methods: {
    copyToClipBoard(textToCopy) {
      navigator.clipboard.writeText(textToCopy);
    },
  },
};
</script>

<style scoped>
.channel-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: auto;
  margin-bottom: 2rem;
  background-color: var(--primary);
  border-radius: 0.6rem;
  padding: 3% 2% 3% 2%;
}

.channel-card-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.channel-card-name {
  display: flex;
  font-size: 1.8rem;
  font-weight: bold;
  align-items: center;
}
.channel-card-address {
  display: flex;
  font-size: 1.4rem;
  align-items: baseline;
  justify-content: center;
  cursor: pointer;
}
.optin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 30%;
  border-radius: 0.6rem;
  background-color: var(--teritary);
  cursor: pointer;
}

@media only screen and (max-width: 981px) {
  .optin {
    width: 15%;
    height: 3rem;
    border-radius: 0.6rem;
    background-color: var(--teritary);
    cursor: pointer;
  }
}

@media only screen and (max-width: 580px) {
  .channel-card {
    flex-direction: column;
    align-items: center;
  }

  .optin {
    width: 6rem;
    height: 3rem;
    border-radius: 0.6rem;
    background-color: var(--teritary);
    cursor: pointer;
  }
}
</style>
