// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod errs;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::auth,
            commands::random,
            commands::download,
            commands::logout,
            commands::check_token
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
