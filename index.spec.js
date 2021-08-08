const request = require("supertest");
const should = require("should");
const app = require("./index");

describe("GET /users/:id는", () => {
  describe("성공시", () => {
    it("유저 객체를 담은 배열로 응답한다", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it("최대 limit 갯수만큼 응답한다", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("limit이 숫자형이 아니면 400을 응답한다.", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});
describe("GET /user/:id는", () => {
  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다", (done) => {
      request(app)
        .get("/user/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐경우 400으로 응답한다", (done) => {
      request(app).get("/user/one").expect(400).end(done);
    });
    it("id로 유저를 찾을수 없을 경우 404로 응답한다", (done) => {
      request(app).get("/user/0").expect(404).end(done);
    });
  });
});
describe("DELETE /user/:id는", () => {
  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app).delete("/user/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("204를 응답한다", (done) => {
      request(app).delete("/user/1").expect(204).end(done);
    });
    it("id가 숫자가 아닐경우 400으로 응답한다", (done) => {
      request(app).delete("/user/one").expect(400).end(done);
    });
  });
});
describe("POST /user", () => {
  describe("성공시", () => {
    let name = "daniel";
    let body;
    before((done) => {
      request(app)
        .post("/user")
        .send({
          name,
        })
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 유저 객체를 반환한다", () => {
      body.should.have.property("id");
    });
    it("입력한 name을 반환한다", () => {
      body.should.have.property("name", name);
    });
  });
  describe("실패시", () => {
    it("name 파라매터 누락시 400을 반환한다", (done) => {
      request(app).post("/user").send({}).expect(400).end(done);
    });
    it("name이 중복일 경우 409를 반환한다", (done) => {
      request(app).post("/user").send({ name: "daniel" }).expect(409).end(done);
    });
  });
});
describe("PUT /user/:id는", () => {
  const name = "chalie";
  describe("성공시", () => {
    it("변경된 name을 응답한다", (done) => {
      request(app)
        .put("/user/1")
        .send({ name })
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });
});
