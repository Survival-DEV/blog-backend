import { Test, TestingModule } from "@nestjs/testing";
import { TagsService } from "./tags.service";

describe("TagsService", () => {
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ { provide: TagsService, useValue: { findAll: jest.fn() } } ]
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
