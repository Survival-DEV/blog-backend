import { Test, TestingModule } from "@nestjs/testing";
import { TagsController } from "../../src/tags/tags.controller";
import { TagsService } from "../../src/tags/tags.service";

describe("TagsController", () => {
  let controller: TagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [ { provide: TagsService, useValue: { findAll: jest.fn() } } ]
    }).compile();

    controller = module.get<TagsController>(TagsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
