import requests
from bs4 import BeautifulSoup

def scrape_job_news(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    job_news = []

    # 뉴스 아이템을 찾습니다.
    news_items = soup.find_all('li', class_='bx')

    for item in news_items:
        title_tag = item.find('a', class_='news_tit')
        if title_tag:
            title = title_tag.get('title')
            link = title_tag.get('href')
            job_news.append({'title': title, 'link': link})

    return job_news

# 이 코드는 주로 모듈로 사용할 것이므로, 메인 실행 코드는 제거해도 좋습니다.
