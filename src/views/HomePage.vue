<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Data Cryptocurrency (Top 5)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container" class="ion-padding">
        <h2 class="text-center">Daftar Cryptocurrency Teratas (5 Data)</h2>
        
        <ion-button expand="block" @click="fetchCryptoData" class="ion-margin-bottom">
          Get Data
        </ion-button>

        <div v-if="isLoading" class="loading-indicator text-center">
          <ion-spinner name="circles"></ion-spinner>
          <p>Memuat data...</p>
        </div>

        <div v-if="cryptoData.length > 0 && !isLoading" class="table-responsive">
          <table class="crypto-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Harga USD</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="crypto in cryptoData" :key="crypto.id">
                <td>{{ crypto.name }}</td>
                <td>{{ crypto.symbol }}</td>
                <td>{{ parseFloat(crypto.price_usd).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!isLoading && cryptoData.length === 0 && !hasError" class="text-center">
          <p>Tekan "Get Data" untuk memuat daftar cryptocurrency.</p>
        </div>
        <div v-if="hasError" class="error-message text-center">
          <p>Terjadi kesalahan saat memuat data. Silakan coba lagi.</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSpinner
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import CryptoService from '@/services/CryptoService';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonSpinner
  },
  setup() {
    const cryptoData = ref<any[]>([]);
    const isLoading = ref(false);
    const hasError = ref(false);

    const fetchCryptoData = async () => {
      isLoading.value = true;
      hasError.value = false;
      cryptoData.value = [];

      try {
        const service = new CryptoService('https://api.coinlore.net/api/tickers/');
        const data = await service.getTickers();

        if (data && data.data && Array.isArray(data.data)) {
          // --- PERUBAHAN DI SINI: Memfilter 5 data pertama ---
          cryptoData.value = data.data.slice(0, 5); 
          // --------------------------------------------------
        } else {
          console.warn('API response structure is not as expected:', data);
          hasError.value = true;
        }
      } catch (error) {
        console.error('Failed to fetch crypto data:', error);
        hasError.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      cryptoData,
      isLoading,
      hasError,
      fetchCryptoData
    };
  }
});
</script>

<style scoped>
/* Styling tetap sama seperti sebelumnya */
#container {
  padding: 20px;
  text-align: center;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

ion-button {
  --background: #3880ff;
  --background-activated: #2f6acb;
  --background-hover: #2f6acb;
  --border-radius: 8px;
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  height: 48px;
  margin-bottom: 20px;
}

.table-responsive {
  overflow-x: auto;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.crypto-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  min-width: 300px;
}

.crypto-table th,
.crypto-table td {
  padding: 12px 15px;
  text-align: left;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
}

.crypto-table th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #555;
  text-transform: uppercase;
  font-size: 14px;
}

.crypto-table tbody tr:hover {
  background-color: #00bbf9;
}

.crypto-table tbody tr:last-child td {
  border-bottom: none;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  color: #666;
}

.loading-indicator ion-spinner {
  width: 40px;
  height: 40px;
  --color: #3880ff;
}

.error-message {
  color: #eb445a;
  margin-top: 20px;
  font-weight: bold;
}

.text-center {
  text-align: center;
}
</style>

