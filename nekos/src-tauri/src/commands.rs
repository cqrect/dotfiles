use std::collections::HashMap;
use std::path::PathBuf;

use crate::errs;
use once_cell::sync::Lazy;
use tokio::fs::OpenOptions;
use tokio::io::AsyncWriteExt;
use tokio::sync::RwLock;

static TOKEN: Lazy<RwLock<String>> = Lazy::new(|| RwLock::new(String::new()));
static HTTP: Lazy<reqwest::Client> = Lazy::new(|| {
    reqwest::Client::builder()
        .user_agent("NekosDesktop (nekosdesktop.com, v0.0.1)")
        .timeout(std::time::Duration::from_secs(8))
        .build()
        .unwrap()
});

#[tauri::command]
pub async fn auth(username: String, password: String) -> Result<(), errs::Error> {
    let mut body = HashMap::new();
    body.insert("username", username);
    body.insert("password", password);
    let resp = HTTP
        .post("https://nekos.moe/api/v1/auth")
        .json(&body)
        .send()
        .await?;
    let text = resp.text().await?;
    let result: serde_json::Value = serde_json::from_str(&text)?;
    match result.get("message") {
        Some(message) => Err(errs::Error::AuthError {
            message: message.as_str().unwrap().to_string(),
        }),
        None => {
            write_token(result["token"].as_str().unwrap().to_string()).await;
            Ok(())
        }
    }
}

#[tauri::command]
pub async fn random(nsfw: bool, count: u8) -> Result<String, errs::Error> {
    let mut params = HashMap::new();
    params.insert("nsfw", nsfw.to_string());
    params.insert("count", count.to_string());
    let resp = HTTP
        .get("https://nekos.moe/api/v1/random/image")
        .query(&params)
        .header("token", read_token().await)
        .send()
        .await?;
    let text = resp.text().await?;
    let result: serde_json::Value = serde_json::from_str(&text)?;
    match result.get("message") {
        Some(message) => Err(errs::Error::RandomError {
            message: message.as_str().unwrap().to_string(),
        }),
        None => Ok(result["images"][0]["id"].as_str().unwrap().to_string()),
    }
}

#[tauri::command]
pub async fn download(id: String) -> Result<String, errs::Error> {
    let url = format!("https://nekos.moe/image/{}", id);
    let resp = HTTP
        .get(url)
        .header("token", read_token().await)
        .send()
        .await?;
    let mut download_dir = PathBuf::new();
    match tauri::api::path::download_dir() {
        Some(path) => download_dir.push(path),
        None => {
            return Err(errs::Error::DownloadError {
                message: "Can not found download dir!".into(),
            })
        }
    }
    download_dir.push(format!("{}.jpeg", id));
    let mut options = OpenOptions::new();
    let mut file = options.write(true).create(true).open(&download_dir).await?;
    match file.write_all(&resp.bytes().await?).await {
        Ok(_) => Ok(download_dir.to_str().unwrap().to_string()),
        Err(_) => Err(errs::Error::DownloadError {
            message: format!("{} write failed!", download_dir.to_str().unwrap()).into(),
        }),
    }
}

#[tauri::command]
pub async fn check_token() -> bool {
    !read_token().await.is_empty()
}

#[tauri::command]
pub async fn logout() {
    write_token("".into()).await
}

async fn read_token() -> String {
    let token = TOKEN.read().await;
    if token.is_empty() {
        drop(token);
        let mut cache_dir = PathBuf::new();
        match tauri::api::path::cache_dir() {
            Some(path) => cache_dir.push(path),
            None => return String::from(""),
        }
        cache_dir.push("nekos");
        match tokio::fs::try_exists(&cache_dir).await {
            Ok(_) => (),
            Err(_) => match tokio::fs::create_dir(&cache_dir).await {
                Ok(_) => (),
                Err(_) => return String::from(""),
            },
        }
        cache_dir.push("token.txt");
        let content = tokio::fs::read_to_string(&cache_dir)
            .await
            .unwrap_or("".to_string());
        write_token(content.clone()).await;
        return content;
    }
    token.clone()
}

async fn write_token(new_token: String) {
    let mut token = TOKEN.write().await;
    let mut cache_dir = PathBuf::new();
    match tauri::api::path::cache_dir() {
        Some(path) => cache_dir.push(path),
        None => return,
    }
    cache_dir.push("nekos");
    match tokio::fs::try_exists(&cache_dir).await {
        Ok(_) => (),
        Err(_) => match tokio::fs::create_dir(&cache_dir).await {
            Ok(_) => (),
            Err(_) => return,
        },
    }
    cache_dir.push("token.txt");
    tokio::fs::write(&cache_dir, new_token.as_bytes())
        .await
        .unwrap();
    *token = new_token;
}

#[cfg(test)]
mod tests {
    use crate::commands;

    #[tokio::test]
    async fn write_token() -> Result<(), Box<dyn std::error::Error>> {
        commands::write_token("asdaasdasasdasdasdasdasd".to_string()).await;
        Ok(())
    }

    #[tokio::test]
    async fn read_token() -> Result<(), Box<dyn std::error::Error>> {
        let token = commands::read_token().await;
        println!("{}", token);
        Ok(())
    }

    #[tokio::test]
    async fn check_token() -> Result<(), Box<dyn std::error::Error>> {
        let result = commands::check_token().await;
        println!("{}", result);
        Ok(())
    }
}
