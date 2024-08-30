from flask import Flask, jsonify, request
from flask_cors import CORS
from scrape_script import scrape_job_news

app = Flask(__name__)
CORS(app)  # CORS 설정 추가

@app.route('/api/news', methods=['GET'])
def get_news():
    try:
        url = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=news&ssc=tab.news.all&query=%EC%B1%84%EC%9A%A9&oquery=%EC%B1%84%EC%9A%A9+%EC%8B%9C%EC%9E%A5&tqi=iWZNEdqo1SCssdjYAnNssssssh0-121227&nso=so%3Add%2Cp%3A1m&de=2024.08.30&ds=2024.07.31&mynews=0&office_category=0&office_section_code=0&office_type=0&pd=2&photo=0&service_area=0&sort=1'
        all_news = scrape_job_news(url)

        # 페이징 처리
        page = request.args.get('page', 1, type=int)
        per_page = 5
        start = (page - 1) * per_page
        end = start + per_page
        news_to_return = all_news[start:end]

        return jsonify(news_to_return)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
