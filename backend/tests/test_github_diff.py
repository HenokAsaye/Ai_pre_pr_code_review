from app.services.github_service import compare_payload_to_diff_text


def test_compare_payload_to_diff_text_empty_files() -> None:
    assert compare_payload_to_diff_text({"files": []}) == ""
