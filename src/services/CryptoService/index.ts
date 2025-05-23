// src/services/CryptoService/index.ts

import axios from 'axios'; // Mengimpor pustaka axios untuk permintaan HTTP

/**
 * Kelas layanan untuk mengakses API cryptocurrency dari CoinLore.
 */
export default class CryptoService {
  private apiUrl: string; // URL dasar API

  /**
   * Konstruktor untuk inisialisasi CryptoService.
   * @param url URL API yang akan diakses.
   */
  constructor(url: string) {
    this.apiUrl = url;
  }

  /**
   * Mengambil data ticker cryptocurrency dari API.
   * @returns Promise yang berisi data respons dari API.
   */
  async getTickers(): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl); // Melakukan permintaan GET ke API
      return response.data; // Mengembalikan data dari respons
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error); // Mencatat error jika terjadi
      throw error; // Melemparkan error untuk ditangani di tempat lain
    }
  }
}
