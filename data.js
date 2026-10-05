/**
 * data.js -- Konten studi kasus AlgoKode
 * Semua data adalah studi kasus nyata dengan kode C++ yang bisa dikompilasi.
 */

const CASES = [
  // ---- SORTING ----
  {
    id: 1,
    category: "sorting",
    title: "Bubble Sort: Urutkan Nilai Mahasiswa",
    desc: "Mengurutkan daftar nilai ujian mahasiswa dari terkecil ke terbesar menggunakan bubble sort.",
    complexity: "O(n²)",
    space: "O(1)",
    difficulty: "Pemula",
    problem: `Sebuah kelas memiliki 6 mahasiswa dengan nilai ujian berikut: 78, 55, 92, 34, 67, 88. Kita perlu menampilkan nilai tersebut dalam urutan naik untuk memudahkan penentuan peringkat.`,
    steps: [
      "Bandingkan dua elemen yang berdampingan (arr[j] dan arr[j+1]).",
      "Jika arr[j] > arr[j+1], tukar kedua elemen tersebut.",
      "Ulangi proses untuk seluruh elemen (pass pertama).",
      "Setiap pass, elemen terbesar 'menggelembung' ke posisi akhir.",
      "Lakukan n-1 pass untuk memastikan semua elemen terurut."
    ],
    code: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        // Optimasi: berhenti jika tidak ada pertukaran
        if (!swapped) break;
    }
}

int main() {
    int nilai[] = {78, 55, 92, 34, 67, 88};
    int n = sizeof(nilai) / sizeof(nilai[0]);

    cout << "Sebelum diurutkan: ";
    for (int i = 0; i < n; i++) cout << nilai[i] << " ";
    cout << endl;

    bubbleSort(nilai, n);

    cout << "Sesudah diurutkan: ";
    for (int i = 0; i < n; i++) cout << nilai[i] << " ";
    cout << endl;
    // Output: 34 55 67 78 88 92

    return 0;
}`
  },
  {
    id: 2,
    category: "sorting",
    title: "Merge Sort: Urutkan Data Besar dengan Efisien",
    desc: "Implementasi merge sort untuk mengurutkan data besar menggunakan strategi divide and conquer.",
    complexity: "O(n log n)",
    space: "O(n)",
    difficulty: "Menengah",
    problem: `Kita memiliki array dengan banyak elemen yang perlu diurutkan secara efisien. Bubble sort terlalu lambat untuk data besar. Merge sort membagi array menjadi dua bagian, mengurutkan masing-masing, lalu menggabungkannya.`,
    steps: [
      "Bagi array menjadi dua bagian sama besar (divide).",
      "Rekursif urutkan bagian kiri dan bagian kanan.",
      "Gabungkan (merge) dua bagian yang sudah terurut.",
      "Pada saat merge, bandingkan elemen satu per satu dari dua subarray.",
      "Salin sisa elemen yang belum diproses ke array utama."
    ],
    code: `#include <iostream>
using namespace std;

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int L[n1], R[n2];

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);

    mergeSort(arr, 0, n - 1);

    cout << "Hasil: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    // Output: 3 9 10 27 38 43 82
    return 0;
}`
  },

  // ---- SEARCHING ----
  {
    id: 3,
    category: "searching",
    title: "Binary Search: Cari NIM Mahasiswa",
    desc: "Mencari NIM mahasiswa dalam daftar terurut menggunakan binary search jauh lebih cepat daripada linear search.",
    complexity: "O(log n)",
    space: "O(1)",
    difficulty: "Pemula",
    problem: `Database mahasiswa menyimpan NIM dalam urutan terurut. Kita perlu mengecek apakah NIM 220510 ada dalam daftar. Dengan binary search, kita tidak perlu memeriksa satu per satu.`,
    steps: [
      "Tentukan batas kiri (low=0) dan batas kanan (high=n-1).",
      "Hitung posisi tengah: mid = (low + high) / 2.",
      "Jika arr[mid] == target, elemen ditemukan.",
      "Jika arr[mid] < target, cari di bagian kanan (low = mid + 1).",
      "Jika arr[mid] > target, cari di bagian kiri (high = mid - 1).",
      "Ulangi sampai low > high (tidak ditemukan)."
    ],
    code: `#include <iostream>
using namespace std;

int binarySearch(int nim[], int n, int target) {
    int low = 0, high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;  // Hindari overflow

        if (nim[mid] == target) return mid;
        else if (nim[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;  // Tidak ditemukan
}

int main() {
    int daftarNim[] = {210001, 210045, 220100, 220510, 230022, 230300};
    int n = sizeof(daftarNim) / sizeof(daftarNim[0]);
    int cari = 220510;

    int hasil = binarySearch(daftarNim, n, cari);

    if (hasil != -1)
        cout << "NIM " << cari << " ditemukan di indeks " << hasil << endl;
    else
        cout << "NIM " << cari << " tidak ditemukan." << endl;

    return 0;
}`
  },

  // ---- GRAPH ----
  {
    id: 4,
    category: "graph",
    title: "BFS: Cari Rute Terpendek di Kota",
    desc: "Breadth-First Search untuk menemukan jalur terpendek antar titik dalam peta jaringan jalan kota.",
    complexity: "O(V + E)",
    space: "O(V)",
    difficulty: "Menengah",
    problem: `Peta kota direpresentasikan sebagai graf dengan 6 persimpangan (node 0-5) dan beberapa jalan (edge). Kita ingin mencari jalur terpendek (dari sisi jumlah persimpangan) dari titik A (0) ke titik B (5).`,
    steps: [
      "Buat queue dan masukkan node asal.",
      "Tandai node asal sebagai sudah dikunjungi.",
      "Ambil node dari depan queue, proses semua tetangganya.",
      "Untuk setiap tetangga yang belum dikunjungi, tandai dan masukkan ke queue.",
      "Ulangi sampai queue kosong atau node tujuan ditemukan.",
      "Rekonstruksi jalur menggunakan array parent."
    ],
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> bfs(vector<vector<int>>& adj, int start, int end, int V) {
    vector<bool> visited(V, false);
    vector<int> parent(V, -1);
    queue<int> q;

    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
        int node = q.front(); q.pop();

        if (node == end) break;

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                parent[neighbor] = node;
                q.push(neighbor);
            }
        }
    }

    // Rekonstruksi jalur
    vector<int> path;
    for (int v = end; v != -1; v = parent[v])
        path.insert(path.begin(), v);

    return path;
}

int main() {
    int V = 6;
    vector<vector<int>> adj(V);

    // Tambah edge (undirected)
    auto addEdge = [&](int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    };

    addEdge(0, 1); addEdge(0, 2);
    addEdge(1, 3); addEdge(2, 4);
    addEdge(3, 5); addEdge(4, 5);

    vector<int> path = bfs(adj, 0, 5, V);

    cout << "Jalur terpendek: ";
    for (int v : path) cout << v << " ";
    // Output: 0 1 3 5
    return 0;
}`
  },
  {
    id: 5,
    category: "graph",
    title: "DFS: Deteksi Siklus dalam Graf",
    desc: "Depth-First Search untuk mendeteksi apakah ada siklus (cycle) dalam sebuah graf berarah.",
    complexity: "O(V + E)",
    space: "O(V)",
    difficulty: "Menengah",
    problem: `Dalam sistem manajemen dependensi (seperti npm atau Maven), kita perlu memastikan tidak ada dependensi sirkular. Graf berarah digunakan untuk merepresentasikan dependensi, dan DFS digunakan untuk mendeteksi siklus.`,
    steps: [
      "Gunakan dua array: visited (pernah dikunjungi) dan recStack (ada di stack rekursi saat ini).",
      "Mulai DFS dari setiap node yang belum dikunjungi.",
      "Tandai node saat ini sebagai visited dan tambahkan ke recStack.",
      "Untuk setiap tetangga, jika belum dikunjungi, rekursif DFS.",
      "Jika tetangga ada di recStack, siklus ditemukan.",
      "Setelah selesai memproses node, hapus dari recStack."
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

bool dfsDetectCycle(int v, vector<vector<int>>& adj,
                    vector<bool>& visited, vector<bool>& recStack) {
    visited[v] = true;
    recStack[v] = true;

    for (int neighbor : adj[v]) {
        if (!visited[neighbor]) {
            if (dfsDetectCycle(neighbor, adj, visited, recStack))
                return true;
        } else if (recStack[neighbor]) {
            return true;  // Siklus ditemukan!
        }
    }

    recStack[v] = false;
    return false;
}

bool hasCycle(int V, vector<vector<int>>& adj) {
    vector<bool> visited(V, false);
    vector<bool> recStack(V, false);

    for (int i = 0; i < V; i++)
        if (!visited[i])
            if (dfsDetectCycle(i, adj, visited, recStack))
                return true;

    return false;
}

int main() {
    int V = 4;
    vector<vector<int>> adj(V);
    adj[0].push_back(1);
    adj[1].push_back(2);
    adj[2].push_back(3);
    adj[3].push_back(1);  // Siklus: 1->2->3->1

    cout << (hasCycle(V, adj) ? "Ada siklus!" : "Tidak ada siklus.") << endl;
    // Output: Ada siklus!
    return 0;
}`
  },

  // ---- RECURSION ----
  {
    id: 6,
    category: "recursion",
    title: "Menara Hanoi: Rekursi Klasik",
    desc: "Memecahkan puzzle Menara Hanoi dengan rekursi -- memindahkan n cakram dari tiang A ke tiang C.",
    complexity: "O(2ⁿ)",
    space: "O(n)",
    difficulty: "Pemula",
    problem: `Ada 3 tiang (A, B, C) dan n cakram berukuran berbeda. Aturan: (1) Pindahkan satu cakram per langkah. (2) Cakram besar tidak boleh di atas cakram kecil. Tujuan: pindahkan semua cakram dari tiang A ke tiang C.`,
    steps: [
      "Pindahkan n-1 cakram dari A ke B (menggunakan C sebagai tiang bantu).",
      "Pindahkan cakram terbesar dari A ke C.",
      "Pindahkan n-1 cakram dari B ke C (menggunakan A sebagai tiang bantu).",
      "Base case: jika n=1, langsung pindahkan dari asal ke tujuan."
    ],
    code: `#include <iostream>
using namespace std;

void hanoi(int n, char asal, char tujuan, char bantu) {
    if (n == 1) {
        cout << "Pindahkan cakram 1 dari " << asal
             << " ke " << tujuan << endl;
        return;
    }

    // Pindahkan n-1 cakram dari asal ke bantu
    hanoi(n - 1, asal, bantu, tujuan);

    // Pindahkan cakram terbesar ke tujuan
    cout << "Pindahkan cakram " << n << " dari "
         << asal << " ke " << tujuan << endl;

    // Pindahkan n-1 cakram dari bantu ke tujuan
    hanoi(n - 1, bantu, tujuan, asal);
}

int main() {
    int n = 3;
    cout << "Menara Hanoi dengan " << n << " cakram:" << endl;
    hanoi(n, 'A', 'C', 'B');
    // Membutuhkan 2^n - 1 = 7 langkah
    return 0;
}`
  },

  // ---- DYNAMIC PROGRAMMING ----
  {
    id: 7,
    category: "dp",
    title: "Fibonacci dengan Memoization",
    desc: "Perbandingan rekursi naif O(2ⁿ) vs dynamic programming O(n) untuk menghitung deret Fibonacci.",
    complexity: "O(n)",
    space: "O(n)",
    difficulty: "Pemula",
    problem: `Hitung bilangan Fibonacci ke-n. Pendekatan rekursi naif sangat lambat karena menghitung submasalah yang sama berulang kali. Memoization menyimpan hasil yang sudah dihitung untuk dipakai ulang.`,
    steps: [
      "Buat array memo untuk menyimpan hasil perhitungan.",
      "Inisialisasi memo dengan nilai -1 (belum dihitung).",
      "Sebelum menghitung, cek apakah nilai sudah ada di memo.",
      "Jika sudah ada, gunakan langsung -- tidak perlu rekursi lagi.",
      "Jika belum ada, hitung dan simpan hasilnya ke memo.",
      "Ini mengubah kompleksitas dari O(2ⁿ) menjadi O(n)."
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

// Rekursi naif -- O(2^n), sangat lambat untuk n besar
long long fibNaif(int n) {
    if (n <= 1) return n;
    return fibNaif(n - 1) + fibNaif(n - 2);
}

// Memoization -- O(n)
vector<long long> memo;

long long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];  // Sudah dihitung
    return memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
}

// Bottom-up DP -- O(n), tanpa rekursi
long long fibDP(int n) {
    if (n <= 1) return n;
    vector<long long> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}

int main() {
    int n = 10;
    memo.assign(n + 1, -1);

    cout << "Fibonacci ke-" << n << " (Memoization): " << fibMemo(n) << endl;
    cout << "Fibonacci ke-" << n << " (Bottom-up DP): " << fibDP(n) << endl;
    // Output: 55
    return 0;
}`
  },
  {
    id: 8,
    category: "dp",
    title: "0/1 Knapsack: Pilih Barang Optimal",
    desc: "Dynamic programming untuk memilih kombinasi barang dengan total nilai tertinggi tanpa melebihi kapasitas tas.",
    complexity: "O(n * W)",
    space: "O(n * W)",
    difficulty: "Menengah",
    problem: `Seorang pendaki memiliki tas dengan kapasitas 50 kg. Ada 4 barang dengan berat dan nilai berbeda. Tentukan barang mana yang harus dibawa agar total nilai barang maksimal tanpa melampaui kapasitas tas.`,
    steps: [
      "Buat tabel dp[i][w]: nilai maksimal menggunakan i barang pertama dengan kapasitas w.",
      "Base case: dp[0][w] = 0 (tanpa barang, nilai = 0).",
      "Untuk setiap barang i: jika berat[i] > w, tidak bisa diambil, dp[i][w] = dp[i-1][w].",
      "Jika berat[i] <= w, pilih maksimal antara tidak ambil dan ambil barang i.",
      "Jawaban ada di dp[n][W].",
      "Rekonstruksi barang yang dipilih dengan menelusuri tabel ke belakang."
    ],
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack(int W, vector<int>& berat, vector<int>& nilai, int n) {
    // Tabel DP: dp[i][w] = nilai max dengan i barang, kapasitas w
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            // Tidak ambil barang i
            dp[i][w] = dp[i - 1][w];

            // Ambil barang i (jika muat)
            if (berat[i - 1] <= w) {
                int nilaIJikaAmbil = nilai[i - 1] + dp[i - 1][w - berat[i - 1]];
                dp[i][w] = max(dp[i][w], nilaIJikaAmbil);
            }
        }
    }
    return dp[n][W];
}

int main() {
    int W = 50;  // Kapasitas tas
    vector<int> berat = {10, 20, 30, 40};
    vector<int> nilai = {60, 100, 120, 200};
    int n = berat.size();

    cout << "Nilai maksimal: " << knapsack(W, berat, nilai, n) << endl;
    // Output: Nilai maksimal: 220 (barang ke-2 dan ke-3)
    return 0;
}`
  }
];
